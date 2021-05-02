import Head from "next/head";
import React from "react";
import VendorDisplaySingle from "../components/VendorDisplaySingle";

export default function VendorDisplayPage() {
  return (
    <div>
      <Head>
        <title>Vendor Page</title>
      </Head>

      <VendorDisplaySingle />
    </div>
  );
}
