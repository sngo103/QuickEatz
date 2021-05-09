import Head from "next/head";
import React from "react";
import ReactDOM from 'react-dom';
import Router from "next/router";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

/*
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
*/
export class MapContainerVendorPinInitial extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
	  vendorID: "",
	  vendorName: "",
	  marker: {
	  }
    };
	//this.handleChange = this.handleChange.bind(this);
	this.onMapClick = this.onMapClick.bind(this);
  }
  
  componentDidMount(){

		  const account_email = localStorage.getItem("quickeatz_email"); //Get the logged in user's email
		  const vendor = fetch(`/api/getVendorSingleEmail?email=${account_email}`) //Get the vendor's data
          .then((data) => data.json())
		  .then((json) => {this.setState({vendorID: json._id,
										  vendorName: json.business_name,
										  marker: { title: json.business_name,
										  position: { lat: json.current_location.coordinates[0],
													  lng: json.current_location.coordinates[1]}}
										});
		  });
	  
	}
	
	
	
	
	onMapClick(t, map, coord){
		const {latLng} = coord;
		const lat = latLng.lat();
		const lng = latLng.lng();
		const coords = {latitude: lat, longitude: lng};
		this.props.onGPSChange(coords);
		//this.sendLatLon(lat, lng);
		this.setState(previousState => {
			return {
				marker: {title: "Position updated!", position: {lat, lng}}
			};
		});
	}
	
	render(){
		
			return(
			<>
				<h1>Click to make a marker.</h1>
				<Map google={this.props.google} 
					 zoom={11}
					 initialCenter = {{
						lat: 40.7128,
						lng: -74.006}}
					 onClick={this.onMapClick}
				>
				{<Marker title = {this.state.marker.title}
						position = {this.state.marker.position} />}
				</Map>
			</>
			);
		
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4"
})(MapContainerVendorPinInitial)
