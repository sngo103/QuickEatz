import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function FirstPost() {
  return (
    <div class>
      <Layout>
        <Head>

          <div class="navbar">
            <a href="/">Home</a>
            <a href="/login">Login</a>
          </div>
          <section class="topPage">
            <title class="title">Create Account</title>
          </section>
        </Head>

        <section class="midPage">
          <h1>Create Account</h1>
        </section>


        <section class="bottomPage">

          <h1>Please Select a Vendor or Customer Account </h1>
          <select>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>

          <form onSubmit>
            <label class="usernameLabel">
              Username: <input type="text" name="username" />
            </label>
            <div></div>
            <label class="passwordLabel">
              Password: <input type="test" name="password" />
            </label>
            <div></div>
            <input type="submit" value="Submit" />
          </form>

        </section>
      </Layout >


      <style jsx>{`

        .navbar {
          overflow: hidden;
          background-color: #23272a;
          padding: 10px;
          width: 100%;
          display: flex;

          align-items: center;
        }

        .title {
          font: 30px "Bungee Shade";
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
    </div >
  );
}

// <select onChange={this.handleChange} >
// form onSubmit={this.handleSubmit}>