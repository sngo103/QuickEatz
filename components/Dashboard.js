import React from "react";
import Head from "next/head";
import Router from "next/router";
import CustomerDashboard from "./CustomerDashboard.js";
import VendorDashboard from "./VendorDashboard.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      account_type: "customer",
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedToken && storedEmail && storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log("Token verified!");
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              account_type: json.account_type
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: true,
            });
          }
        });
    } else {
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: false
      })
      Router.push("/login")
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else if(this.state.isLoggedIn && this.state.account_type == "customer"){
      return (
        <div>
          <Head>
            <title>Dashboard</title>
          </Head>
          <CustomerDashboard />
        </div>
      );
    } else if(this.state.isLoggedIn && this.state.account_type == "vendor"){
      return (
        <div>
          <Head>
            <title>Dashboard</title>
          </Head>
          <VendorDashboard />
        </div>
      );
    } else {
      return "It's not working"
    }
  }
}

export default Dashboard;
