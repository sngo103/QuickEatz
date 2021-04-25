import Head from "next/head";
import Link from "next/link";
import React, {Component} from 'react'
import VendorDisplaySingle from '../components/VendorDisplaySingle'
import Router from 'next/router';


export default function VendorDisplayPage() {
	
  return (
    <div>
	  
      <Head>
        <title>Vendor Page</title>
      </Head>
      
      <VendorDisplaySingle />
    </div>
  )
}
