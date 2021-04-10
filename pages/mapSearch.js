import { connectToDatabase } from "../util/mongodb";
import React from "react";
import { useRouter } from 'next/router';
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

var close_vendors = [];




export default function mApp({current_vendor, vendors, customers}){
		
	//Testing a routing strat
	//const router = useRouter();
	
	//const refreshData = () => {
	//	router.replace(router.asPath);
	//}
	
	
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
	
	const [nearby_vendors, setVendors] = React.useState([]);
	
	//I think this is the right notation for function declaration
	const searchLatLon = async (latitude, longitude) => {
		
		
		
		
		const data = await fetch(`http://localhost:3000/api/searchLatLon?latitude=${latitude}&longitude=${longitude}`)
		
		const res = await data.json();
		
		console.log(res);
		close_vendors = res;
		console.log(close_vendors);
		return res;
	}
	
	if(loadError) return "Error loading Maps";
	if (!isLoaded) return "Loading Maps";
	
	
	
	
	console.log(vendors);
	// const MyMap = withScriptjs(withGoogleMap((props) => (<GoogleMap />)));
	return (
	<>
	
	
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
				owner: "YOU",
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
			]);
			//setVendors( async current => await searchLatLon(event.latLng.lat(), event.latLng.lng()));
			searchLatLon(event.latLng.lat(), event.latLng.lng());
			setVendors(current => close_vendors);
			//setMarkers(current => [...current, ...close_vendors]);
			console.log("HEY");
			console.log(markers);
			console.log(close_vendors);
			console.log(nearby_vendors);
		}}>
		{markers.map(marker => <Marker key={marker.time.toISOString()} 
										position = {{lat: marker.lat, lng: marker.lng}}
										onClick={() => {setSelected(marker);}}
										/> )}
										
			
		{Array.from(nearby_vendors).map((single_vendor) => 
			<Marker key={single_vendor._id.toString()}
					position = {{lat: single_vendor.current_location.coordinates[0], lng: single_vendor.current_location.coordinates[1]}} 
					onClick={() => {setSelected({
						owner: single_vendor.business_name,
						lat: single_vendor.current_location.coordinates[0],
						lng: single_vendor.current_location.coordinates[1],
						time: new Date(),
						});}}
			/>
		)}
			
		{selected ? (<InfoWindow position = {{lat: selected.lat, lng: selected.lng}} onCloseClick={()=> {setSelected(null);}}>
			<div>
				<p> {selected.owner} </p>
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
