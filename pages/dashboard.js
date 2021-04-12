import Head from 'next/head'
import Link from 'next/link'
import CustomerDashboard from '../components/CustomerDashboard.js'
// import VendorDashboard from '../components/vendorDashboard.js'

export default function DashboardPage() {
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
