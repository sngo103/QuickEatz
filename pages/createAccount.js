import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Account from '../styles/Account.module.css'

export default function FirstPost() {
  return (
    <div>
      <Layout>

        <section class="topPage">
          <Head>
            <title>Create Account</title>
          </Head>
        </section>

        <section class="midPage">
          <h1>Create Account</h1>
        </section>


        <section class="bottomPage">

          <h1>Please Select a Vendor or Cusomer Account </h1>
          <select onChange={this.handleColorChange}>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>

          <form onSubmit={this.handleSubmit}>
            <label>
              Username: <input type="text" name="username" />
            </label>
            <label>
              Password: <input type="test" name="password" />
            </label>
            <input type="submit" value="Submit" />
          </form>

        </section>
      </Layout>

      <style jsx>{`

        .title {
          font: 30px "bungee-shade";
        }

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
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
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

      `}</style>
    </div>
  );
}