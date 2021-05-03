import Head from "next/head";
import React from "react";
//import VendorPin from "../components/VendorPin";
import MapContainerVendorPin from "../components/MapContainerVendorPin";

export default function VendorPinPage() {
  return (
    <div>
      <Head>
        <title>Set Vendor location</title>
      </Head>

      <MapContainerVendorPin />
    </div>
  );
}
