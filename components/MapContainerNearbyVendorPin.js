import React from "react";
import Router from "next/router";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEX from "./InfoWindowEX";
/*
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
*/
export class MapContainerNearbyVendorPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearby_vendors: [],
      user_marker: {},
      marker_set: false,
      active_marker: {},
      selected_location: {},
      showing_info_box: false,
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.searchLatLon = this.searchLatLon.bind(this);
  }

  componentDidMount() {}

  async searchLatLon(latitude, longitude) {
    await fetch(
      `http://localhost:3000/api/searchLatLon?latitude=${latitude}&longitude=${longitude}&limit=2`
    )
      .then((data) => data.json())
      .then((json) => {
        this.setState({
          nearby_vendors: json,
        });
      });
  }

  onMapClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const coords = { latitude: lat, longitude: lng };
    this.props.onGPSChange(coords);
    this.searchLatLon(lat, lng);
    if (this.state.showing_info_box) {
      this.setState({ showing_info_box: false, active_marker: {} });
    }

    this.setState({
      user_marker: { owner: "YOU", position: { lat, lng } },
      active_marker: {},
    });
  }

  render() {
    return (
      <div className="inline-block">
        <Map
          google={this.props.google}
		  style={{height: this.props.style.height, position: 'relative', width: this.props.style.width}}
		  containerStyle={{position: 'relative',  width: this.props.containerStyle.width, height: this.props.containerStyle.height}}
          zoom={11}
          initialCenter={{
            lat: 40.7128,
            lng: -74.006,
          }}
          onClick={this.onMapClick}
		  style={{height: this.props.style.height, position: 'relative', width: this.props.style.width}}
        >
          {this.state.user_marker.position != null ? (
            <Marker
              title={this.state.user_marker.title}
              position={{
                lat: this.state.user_marker.position.lat,
                lng: this.state.user_marker.position.lng,
              }}
              onClick={(event) => {
                let geo_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.user_marker.position.lat},${this.state.user_marker.position.lng}&key=AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4`;
                fetch(geo_url)
                  .then((response) => response.json())
                  .then((data) => {
                    //console.log(data);
                    //your_address_parts = data.results[0].formatted_address;
                    //console.log(your_address_parts);

                    this.setState({
                      //The user's pin
                      marker_set: true,
                      active_marker: {
                        owner: "YOU",
                        lat: this.state.user_marker.position.lat,
                        lng: this.state.user_marker.position.lng,
                        time: new Date(),
                        buttontext: "",
                        actualaddress: data.results[0].formatted_address,
                      },
                    });
                  })
                  .catch((err) => console.warn(err.message));
                this.setState({ showing_info_box: true });
              }}
            />
          ) : null}

          {Array.from(this.state.nearby_vendors).map((
            single_vendor //The found nearby vendors
          ) => (
            <Marker
              key={single_vendor._id.toString()}
              position={{
                lat: single_vendor.current_location.coordinates[0],
                lng: single_vendor.current_location.coordinates[1],
              }}
              onClick={() => {

                let geo_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${single_vendor.current_location.coordinates[0]},${single_vendor.current_location.coordinates[1]}&key=AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4`;
                fetch(geo_url)
                  .then((response) => response.json())
                  .then((data) => {
                    let address_parts = data.results[0].formatted_address;
                    this.setState({
                      showing_info_box: true,
                      active_marker: {
                        owner_id: single_vendor._id,
                        owner: single_vendor.business_name,
                        lat: single_vendor.current_location.coordinates[0],
                        lng: single_vendor.current_location.coordinates[1],
                        time: new Date(),
                        buttontext: "Go to the vendor!",
                        actualaddress: address_parts,
                      },
                    });
                  })
                  .catch((err) => console.warn(err.message));
                this.setState({ showing_info_box: true });
              }}
            />
          ))}

          {this.state.showing_info_box && this.state.active_marker != null ? (
            <InfoWindowEX
              position={{
                lat: this.state.active_marker.lat,
                lng: this.state.active_marker.lng,
              }}
              visible={this.state.showing_info_box}
              onClick={() => console.log("Power Pizza")}
              onCloseClick={() => {
                this.setState({
                  active_marker: {},
                  selected_location: {},
                  showing_info_box: false,
                });
              }}
            >
              <div>
                <p> {this.state.active_marker.owner} </p>
                <p> Lat: {this.state.active_marker.lat} </p>
                <p> Lon: {this.state.active_marker.lng} </p>
                <p> Address: {this.state.active_marker.actualaddress} </p>

                <button
                  type="button"
                  onClick={() =>
                    Router.push({
                      pathname: "/viewVendorSingle",
                      query: { vendor_id: this.state.active_marker.owner_id },
                    })
                  }
                >
                  {" "}
                  {this.state.active_marker.buttontext}{" "}
                </button>
              </div>
            </InfoWindowEX>
          ) : null}
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4",
})(MapContainerNearbyVendorPin);
