import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import CustomerDashboard from '../components/CustomerDashboard.js'
import VendorDashboard from '../components/vendorDashboard.js'
// import jsHttpCookie from 'cookie';



export default function DashboardPage({initProps}) {
	console.log(initProps);
  return (
    <div>
	  
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* <CustomerDashboard /> */}
      <VendorDashboard />
    </div>
  )
}
