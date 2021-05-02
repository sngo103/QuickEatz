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
export class MapContainer extends React.Component {
	/*
	componentDidMount(){
		this.loadMap();
	}
	
	componentDidUpdate(prevProps, prevState){
		if(prevProps.google !== this.props.google){
			this.loadMap();
		}
	}
	
	loadMap(){
		if(this.props && this.props.google){
			// api available
			const {google} = this.props;
			const maps = google.maps;
			
			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);
			
			let zoom = 12;
			let lat = 40.7128;
			let lng = -74.006;
			const center = new maps.LatLng(lat, lng);
			const mapConfig = Object.assign({}, {center: center, zoom: zoom});
			this.map = new maps.Map(node, mapConfig);
		}
	}
	
	render() {
		const style = {
			  width: "100vw",
			  height: "100vh",
		};
		return(
			<div ref = 'map'>
				Loading map.
			</div>
		);
		
	}
	*/
	render(){
		return(
		<>
			<Map google={this.props.google} 
				 zoom={11}
				 initialCenter = {{
					lat: 40.7128,
					lng: -74.006}}
				 
			>
			
			</Map>
		</>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4"
})(MapContainer)
