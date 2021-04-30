import Head from 'next/head'
import Link from 'next/link'
import CustomerDashboard from '../components/CustomerDashboard.js'

export default function DashboardPage() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <CustomerDashboard />
    </div>
  )
}
