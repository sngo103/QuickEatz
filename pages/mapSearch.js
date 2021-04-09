import { connectToDatabase } from "../util/mongodb";
import React from "react";

//import { GoogleMap, Marker } from "react-google-maps";
import {GoogleMap, Marker, InfoWindow, useLoadScript, } from "@react-google-maps/api";

const { GOOGLE_MAPS_API_KEY } = process.env;

const ObjectId = require('mongodb').ObjectID;

const libraries = ["places"]; //libraries to avoid rerender?
const mapContainerStyle = {
	width: "100vw",
	height: "100vh",
};
const center = {
	lat: 40.7128,
	lng: -74.0060,
};

const options = {
	
};

const close_vendors = [];

export default function mApp({current_vendor, vendors, customers}){
	
	//console.log({current_vendor, vendors, customers});
	//console.log("Hey");
	//console.log(process.env.GOOGLE_MAPS_API_KEY);
	
	//NOTE BAD PRACTICE TO SHOEHORN API KEY IN USE ENVLOCAL MAYBE
	
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: "AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4",
		libraries,
	});
	const [markers, setMarkers] = React.useState([]); //MAYBE A BETTER WAY TO DO THIS
	
	const [selected, setSelected] = React.useState(null); //FOR INFO BOX
	
	
	//I think this is the right notation for function declaration
	const searchLatLon = async (latitude, longitude) => {
		
		
		
		
		const data = await fetch(`http://localhost:3000/api/searchLatLon?latitude=${latitude}&longitude=${longitude}`)
		
		const res = await data.json();
		
		console.log(res);
		
		close_vendors = res;
	}
	
	if(loadError) return "Error loading Maps";
	if (!isLoaded) return "Loading Maps";
	
	
	
	
	console.log(vendors);
	// const MyMap = withScriptjs(withGoogleMap((props) => (<GoogleMap />)));
	return (
	<>
 
	<script> 
		function displayVendors(){
			document.getElementById("vendor_list_block").style.display = "block";
			var i;
			document.getElementById("vendor_list").innerHTML = "";
			for(i = 0; i < close_vendors.length; i++){
				document.getElementById("vendor_list").innerHTML += ('<li>'+close_vendors[i].business_name+'</li>');
			}
		}
		function hideVendors(){
			
			
		}
	</script>
	
	
	
	<script>
		if(close_vendors.length == 0){
			document.getElementById("empty_text").innerHTML = "Find a vendor by clicking on the map!";
		}
		else{
			document.getElementById("empty_text").innerHTML = "Nearby Vendors";
		}
	</script>
	
	
	<p id="empty_text"> </p>
	<div id="vendor_list_block"> 
	  <ul id="vendor_list">
        
      </ul>
	</div>
	
	
	
	
	<h1> My current location </h1>
	<div>
	  <ul>
        {customers.map((customer) => (
          <li>
            <h3>{customer.first_name + " " + customer.last_name}</h3>
          </li>
        ))}
      </ul>
    </div>
	<div>
		
		<GoogleMap mapContainerStyle={mapContainerStyle} 
		zoom={8} 
		center = {center}
		onClick={(event) => {
			setMarkers(current => [
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
			]);
			searchLatLon(event.latLng.lat(), event.latLng.lng());
			displayVendors();
			
		}}>
		{markers.map(marker => <Marker key={marker.time.toISOString()} 
										position = {{lat: marker.lat, lng: marker.lng}}
										onClick={() => {setSelected(marker);}}
										/> )}
										
			console.log(selected);							
		{selected ? (<InfoWindow position = {{lat: selected.lat, lng: selected.lng}} onCloseClick={()=> {setSelected(null);}}>
			<div>
				<p> Lat: {selected.lat} </p>
				<p> Lon: {selected.lng} </p>
			</div> 
			</InfoWindow>) : null} //ternary
										
		</GoogleMap>
	</div>
	
	
	
	</>);
	
}

export async function getServerSideProps(){
	
   
  const { db } = await connectToDatabase();
  
  
  //HARDCODED
  const test_id_str = "60519b709b7aa38721d085f7";
  const test_id = new ObjectId(test_id_str);
  
  const current_vendor = await db
    .collection("vendors")
    .find({_id: test_id})
    .sort({ average_rating: -1 })
    .limit(1)
    .toArray();
  
  const vendors = await db
    .collection("vendors")
    .find({"_id": test_id})
    .sort({ average_rating: -1 })
    .limit(20)
    .toArray();
	
   const customers = await db
    .collection("customers")
    .find({})
    .sort({})
    .limit(20)
    .toArray(); 

	console.log(current_vendor);
  return {
    props: {
      vendors: JSON.parse(JSON.stringify(vendors)),
	  customers: JSON.parse(JSON.stringify(customers)),
    },
  };
	
	
}
