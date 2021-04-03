import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/accountLayout'


export default function FirstPost() {
  return (
    <div>

      <div className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
      </div>

      <section className="topPage">

        <Head>
          <title className="title">Create Account</title>
        </Head>
        <Layout>
          <h1 className="title">Create Account</h1>
        </Layout>
      </section>

      <section className="midPage">
        <h1 className="message">Please Select a Vendor or Customer Account </h1>
      </section>

      <section className="bottomPage">

        <select className="dropdown">
          <option value="Customer">Customer</option>
          <option value="Vendor">Vendor</option>
        </select>

        <form>
          <label className="usernameLabel">
            Username: <input className="textbox" type="text" name="username" />
          </label>
          <></>

          <div></div>

          <label className="passwordLabel">
            Password: <input className="textbox" type="test" name="password" />
          </label>

          <div></div>

          <input className="submissionField" type="submit" value="Submit" />
        </form>

      </section>


      <style jsx>{`
        @import url('https://fonts.googleapis.com/css?family=Bungee Shade');
        @import url('https://fonts.googleapis.com/css?family=Bungee');
      
        
        .navbar {
          overflow: hidden;
          background-color: #F9FEFF; /*#F7FFF7;*/
          padding: 10px;
          width: 100%;
          display: flex
          position: fixed;

          align-items: center;
        }

        .navbar a {
          float: left;
          color: #000000;
          text-align: center;
          padding: 10px 10px 10px 10px;
          text-decoration: none;
          font-size: 30px;
        }

        .navbar a:hover {
          background-color: #DDD;
          color: black;
        }
        
        .navbar a.active {
          background-color: #7289DA;
          color: white;
        }

        .title {
          font-family: "Bungee Shade";
          font-size: 55px;
          color: white;
          height: 0px;
        }

        .dropdown {
          background: #F9FEEF;
          padding: 5px 5px 5px 45px;
          align-text: center;
          height: 50px;
          width: 200px;
          font-size: 25px;
          
        }

        dropdown:hover .dropdown-content {
          display: block;
        }

        .usernameLabel {
          font-size: 40px;  
          border: #FFE66D 10px 10px 10px 10px;
          outline: #000000 30px 30px 30px 30px;
          height: 100px;
        }

        .passwordLabel {
          font-size: 40px;
          border: #51B1E7 30px 30px 30px 30px;
          outline: #000000 30px 30px 30px 30px;
        }

        .textbox {
          height: 50px;
          background: #F9FEEF;
          font-size: 35px;
          padding: 2px 7px 0px 7px;
        }        

        submissionField {
          width: 100px; 
          height: 500px; 
          background: #B3DEE5; 
        }


        .topPage {
          background-color: #B3DEE5;
          /*#FF6B6B Red*/ /*#FEB557;peach orange*/
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          text-align: center;
          
        }

        .midPage {
          background-color: #E2A60B;
           /*#FFAC41; #FFE66D;*/ 
          /*#FEB75D;*/
          /*#927E65;*/
          /*#F8981D; orange;  #FEB557;*/
          /* FEB04C slightly orange white; */

          padding: 20px 20px 20px 30px;
          align-items: center;
          text-align: center;
        }

        .bottomPage {
          background-color: #FFE66D; 
          /*#4ECDC4;*/
          align-items: center;
          text-align: center;
          padding 225px 225px 275px 225px;
          position: relative;
          bottom: 0;
        }

        .message {
          font-family: "Bungee"; 
          font-size: 35px;
          color: #4F3D13;
          /*#5C4917;*/
          /*color: #775D1D;*/
        }

      `}</style>

      <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          }
        
          * {
            box-sizing: border-box;
          }
      `}</style>

    </div >
  );
}

// <select onChange={this.handleChange} >
// form onSubmit={this.handleSubmit}>

