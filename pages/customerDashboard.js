import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Customer Dashboard Page</h1>
    </Layout>
  )
}