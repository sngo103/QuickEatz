import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainerVendorPinInitial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendor: false,
      vendorID: "",
      vendorName: "",
      marker: {},
    };
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount() {
    const account_type = localStorage.getItem("quickeatz_type");
    const isVendorAccount = account_type == "vendor";
    this.setState({ isVendor: isVendorAccount });
    if (isVendorAccount) {
      const account_email = localStorage.getItem("quickeatz_email"); //Get the logged in user's email
      const vendor = fetch(`/api/getVendorSingleEmail?email=${account_email}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendorID: json._id,
            vendorName: json.business_name,
            marker: {
              title: json.business_name,
              position: {
                lat: json.current_location.coordinates[0],
                lng: json.current_location.coordinates[1],
              },
            },
          });
        });
    }
  }

  onMapClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const coords = { latitude: lat, longitude: lng };
    this.props.onGPSChange(coords);
    this.setState((previousState) => {
      return {
        marker: { title: "Position updated!", position: { lat, lng } },
      };
    });
  }

  render() {
   
      return (
        <>
          <Map
            google={this.props.google}
			style={{height: this.props.style.height, position: 'relative', width: this.props.style.width}}
			containerStyle={{position: 'relative',  width: this.props.containerStyle.width, height: this.props.containerStyle.height}}
            zoom={9}
            initialCenter={this.props.initialCenter}
			center={this.state.marker.position}
            onClick={this.onMapClick}
          >
            {
              <Marker
                title={this.state.marker.title}
                position={this.state.marker.position}
              />
            }
          </Map>
        </>
      );
    
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4",
})(MapContainerVendorPinInitial);
