import React, { useContext } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Router from "next/router";
import jsCookie from "js-cookie";
import { logout, checkLogin } from "../lib/loginFunctions";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      openMenu: false,
      account: "customer",
      isUpToDate: false,
    };
    this.handleLogin = this.handleLogin.bind(this); //JUST FOLLOWING THE PATTERN -MYLES
    this.handleLogout = this.handleLogout.bind(this);
    this.clickMenu = this.clickMenu.bind(this);
    //console.log(this.state);
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    //console.log(storedEmail);
    //console.log(storedToken);
    const cookie_val = jsCookie.get();
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail,
      };
      //console.log(JSON.stringify(data));
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
              isUpToDate: false,
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: false,
              isUpToDate: false,
            });
          }
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
        isUpToDate: false,
      });
    }
  }

  componentDidUpdate() {
    //To get the navbar to change on load
    //When updating the page, check if we're logged in. THis is more frequent than componentDidMount
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    //console.log(storedEmail);
    //console.log(storedToken);
    const cookie_val = jsCookie.get();
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail,
      };
      //console.log(JSON.stringify(data));
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success && !this.state.isLoggedIn) {
            //Prevent loop. ASSUMES LOG OUT WORKS. If logged out when actually logged in, update.
            console.log("Token verified!");
            //console.log(json.newToken); I STOPPED THE USE OF A NEW TOKEN IN VERIFYSHALLOW
            //localStorage.setItem("quickeatz_token", json.newToken);
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              isUpToDate: false, // ? How is this used?
              openMenu: false,
            });
          }
        });
    }
    /* OUT OF DATE
	console.log("Checking if NavBar needs an update. State:");
	console.log(this.state);
	if(!this.state.isUpToDate){
		console.log("Updating Navbar...");
		this.setState({isUpToDate: true});
	}
	else{
		console.log("Navbar is up to date.");
	} */
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

  async handleLogin() {
    console.log("ME NEXT");
    await checkLogin(
      this.state.email,
      this.state.password,
      this.state.account_type
    );

    this.setState({
      isLoggedIn: true,
      isLoading: false,
    });
    /* this.setState((prevState) => {
      let openMenu_val = { ...prevState.openMenu };
      let account_val = { ...prevState.account };
      loggedIn_val = true;
      return {
        openMenu: openMenu_val,
        account: account_val,
        loggedIn: loggedIn_val,
      };
    }); */
    //Router.reload();
  }

  async handleLogout() {
    await logout(this.state.email);
    localStorage.removeItem("quickeatz_token");
    localStorage.removeItem("quickeatz_email");
    localStorage.setItem("quickeatz", false);
    this.setState({
      isLoggedIn: false,
      isLoading: false,
      isUpToDate: false,
    });
    Router.push("/");

    /*this.setState((prevState) => {
      let openMenu_val = { ...prevState.openMenu };
      let account_val = { ...prevState.account };
      loggedIn_val = true;
      return {
        openMenu: openMenu_val,
        account: account_val,
        loggedIn: loggedIn_val,
      };
    }); */

    //Router.reload();
    //signOut();
  }

  clickMenu() {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  }

  render() {
    const signedInBar = (
      <div key="signedInNav" className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                onClick={this.clickMenu}
                className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true" /*true*/
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  src="/images/profile.png"
                  alt="Profile Image"
                  width={32}
                  height={32}
                />
              </button>
            </div>
            {/*
        Dropdown menu, show/hide based on menu state.
        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
        */}

            {this.state.openMenu && (
              <div className="container" ref={this.container}>
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link href="/viewProfile">
                    <a
                      href="/viewProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                  </Link>
                  
                    <button
                      onClick={this.handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const notSignedInBar = (
      <>
        <div key="signedOutNav" className="hidden md:block">
          <div className="ml-4 flex items-center md:ml-6">
          <Link href="/createAccount"><a
              href="/createAccount"
              className="bg-gray-900 text-white mx-1 px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
            >
              Sign Up
            </a></Link>
            <Link href="/login"><a
              href="/login"
              className="bg-gray-900 text-white mx-1 px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
            >
              Log In
            </a></Link>
          </div>
        </div>
      </>
    );

    return (
      <div>
        <Head>
          <link rel="icon" href="images/quickeatzclip.png" />
          <title>QuickEatz</title>
        </Head>
        <nav className="bg-yellow-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white font-bungee text-2xl">
                  {" "}
                  <Link href="/">QuickEatz</Link>{" "}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/trending">
                    <a
                      href="/trending"
                      className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                    >
                      Trending
                    </a>
                    </Link>
                    {this.state.isLoggedIn && (
                      <Link href="/dashboard">
                      <a
                        href="/dashboard"
                        className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                      >
                        Dashboard
                      </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {this.state.isLoggedIn ? signedInBar : notSignedInBar}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
