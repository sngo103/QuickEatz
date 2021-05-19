import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  render() {
    return (
      <>
        <Map
          google={this.props.google}
          zoom={11}
          initialCenter={{
            lat: 40.7128,
            lng: -74.006,
          }}
        ></Map>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4",
})(MapContainer);
