import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Account from '../styles/Account.module.css'

export default function FirstPost() {
  return (
    <Layout>

      <Head>
        <title>Create Account</title>
      </Head>

      <h1>Create Account Page</h1>
      <h1>Please Select a Vendor or Cusomer Account </h1>
      <select onChange={this.handleColorChange}>
        <option value="Customer">Customer</option>
        <option value="Vendor">Vendor</option>
      </select>

      <form onSubmit={this.handleSubmit}>
        <label>
          Username: <input type="text" name="username" />
          Password: <input type="test" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  )
}