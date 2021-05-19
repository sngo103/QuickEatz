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
        email: storedEmail,
      };
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
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              account_type: json.account_type,
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: true,
            });
            Router.push("/login");
          }
        });
    } else {
      this.setState({
        isLoggedIn: false,
        isLoading: false,
      });
      Router.push("/login");
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div class="flex justify-around">
          <span class="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
              disabled=""
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing
            </button>
          </span>
        </div>
      );
    } else if (this.state.isLoggedIn && this.state.account_type == "customer") {
      return (
        <div>
          <Head>
            <title>Dashboard</title>
          </Head>
          <CustomerDashboard />
        </div>
      );
    } else if (this.state.isLoggedIn && this.state.account_type == "vendor") {
      return (
        <div>
          <Head>
            <title>Dashboard</title>
          </Head>
          <VendorDashboard />
        </div>
      );
    } else {
      return "It's not working";
    }
  }
}

export default Dashboard;
