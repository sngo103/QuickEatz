import Head from "next/head";
import React from "react";
//import VendorPin from "../components/VendorPin";
import MapContainerVendorPinInitial from "../components/MapContainerVendorPinInitial";

export default function VendorPinInitialPage() {
	const [coords, setCoords] = React.useState(null); //FOR INFO BOX
	
	const setCoordinates = (coord_pair) => {
		console.log(coord_pair);
		//setCoords({lat: coord_pair.latitude, lng: coord_pair.longitude}, console.log(coords));
		//console.log(coords);
	}
	
  return (
    <div>
      <Head>
        <title>Set Vendor location</title>
      </Head>

      <MapContainerVendorPinInitial  onGPSChange={setCoordinates} />
    </div>
  );
}
