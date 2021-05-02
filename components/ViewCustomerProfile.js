import React from "react";
import Head from "next/head";
import Link from "next/link";
import jsCookie from "js-cookie";
import Unauthorized from "./Unauthorized";

export default class ViewCustomerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    console.log(storedEmail);
    console.log(storedToken);
    const cookie_val = jsCookie.get();
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail,
      };
      console.log(JSON.stringify(data));
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            console.log("Token verified!");
            //console.log(json.newToken); I STOPPED THE USE OF A NEW TOKEN IN VERIFYSHALLOW
            //localStorage.setItem("quickeatz_token", json.newToken);
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: false,
            });
          }
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
    }
  }

  static async getInitialProps({ req }) {
    console.log(req);
    const initProps = {};
    if (req && req.headers) {
      const cookies = req.headers.cookie;
      if (typeof cookies === "string") {
        const cookiesJSON = jsHttpCookie.parse(cookies);
        initProps.token = cookiesJSON.token;
      }
    }
    return initProps;
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Head>
            <title>My Profile</title>
          </Head>
          <div className="container p-5 text-center">
            <h1 className="text-3xl">View My Customer Profile</h1>
            <br />
            <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
              <Link href="/">Return to Home</Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <Unauthorized />;
    }
  }
}
