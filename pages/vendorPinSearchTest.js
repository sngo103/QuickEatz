import Head from "next/head";
import React from "react";
import MapContainerNearbyVendorPin from "../components/MapContainerNearbyVendorPin";

export default function VendorSearchPinPage() {
  return (
    <div>
      <Head>
        <title>Get Vendor location</title>
      </Head>

      <MapContainerNearbyVendorPin />
    </div>
  );
}
