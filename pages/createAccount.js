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

      <h1>Create Account</h1>
      <p></p>
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

    <jsx>{`
      .usernameLabel {
      border: #FFE66D 30px 30px 30px 30px;
      outline: #000000 30px 30px 30px 30px;
      }

      .passwordLabel {
      border: #51B1E7 30px 30px 30px 30px;
      outline: #000000 30px 30px 30px 30px;
      }

      .topPage {
      background-color: #FF6B6B;
      }

      .midPage {
      background-color: #FFE66D;
      }

      .bottomPage {
      background-color: #4ECDC4;
      }

      .enterUsername {
      border: #FFE66D 30px 30px 30px 30px;
      outline: #000000 30px 30px 30px 30px;
      }

      .enterPassword {
      border: #51B1E7 30px 30px 30px 30px;
      outline: #000000 30px 30px 30px 30px;
      }
      
    `}</jsx>
  );
}