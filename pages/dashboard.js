import Head from 'next/head'
import Link from 'next/link'
import CustomerDashboard from '../components/CustomerDashboard.js'
import VendorDashboard from '../components/VendorDashboard.js'

import jsHttpCookie from 'cookie';
import React, {Component} from 'react'





export default function DashboardPage({initProps}) {
	console.log(initProps);
  return (
    <div>
	  
      <Head>
        <title>Dashboard</title>
      </Head>
      <CustomerDashboard />
      {/* <VendorDashboard />*/}
    </div>
  )
}


