import Head from "next/head";
import React from "react";
import Router from "next/router";
import {Map, InfoWindow, Marker, GoogleAPIWrapper} from 'google-maps-react';
/*
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
*/
export class MapContainer extends React.Component {
	
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
}

export GoogleAPIComponent({
	apiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4"
})(MapContainer)

export class VendorPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendor: false,
	  vendorID: "",
	  vendorName: "",
    };
  
  }
  
  
	componentDidMount(){
	  const account_type = localStorage.getItem("quickeatz_type");
	  const isVendorAccount = (account_type == "vendor");
	  this.setState({isVendor: isVendorAccount});
	  if(isVendorAccount){
		  const account_email = localStorage.getItem("quickeatz_email"); //Get the logged in user's email
		  const vendor = fetch(`/api/getVendorSingleEmail?email=${account_email}`) //Get the vendor's data
          .then((data) => data.json())
		  .then((json) => {this.setState({vendorID: json._id,
										  vendorName: json.business_name})});
	  }
	}
	
	async sendLatLon(latitude, longitude){
		const id_str = this.state.vendorID.toString();
			await fetch(
		  `/api/sendLatLon?_id=${id_str}&latitude=${latitude}&longitude=${longitude}`
			);
	}
	
    render(){
		console.log("Render called!");
	  if(this.state.isVendor == false){
		  return (<p> You are not a vendor. How did you get here? </p>);
	  }
	  else{
		  
	
		    return (
					<>
					<MapContainer />
				  
					</>
			  );
	  }
  }
  
}

export default VendorPin;


/*

console.log("Prepping map");
		    const { isLoaded, loadError } = useLoadScript({
				googleMapsApiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4",
				libraries,
			});
			console.log("Got loadscript!");
			
			const marker = null; 
			const libraries = ["places"]; //libraries to avoid rerender?
			const mapContainerStyle = {
			  width: "100vw",
			  height: "100vh",
			};
			const center = {
			  lat: 40.7128,
			  lng: -74.006,
			};

			const options = {}; // Leave this just in case.
			console.log("Done prepping!");
  <h1> Please set the location of {this.state.vendorName}. </h1>
				  
				  
					<GoogleMap
					  mapContainerStyle={mapContainerStyle}
					  zoom={10}
					  center={center}
					  onClick={(event) => {
						marker =  {
							lat: event.latLng.lat(),
							lng: event.latLng.lng(),
							time: new Date(),
						  },
						 sendLatLon( event.latLng.lat(), event.latLng.lng());
					  }}
					>
						
						<Marker
						  key={marker.time.toISOString()}
						  position={{ lat: marker.lat, lng: marker.lng }}
						  
						/>
						
					  
					</GoogleMap>
*/