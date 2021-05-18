import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { logout } from "../lib/loginFunctions";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      account: "customer",
      isUpToDate: false,
      isLoggedIn: false,
      isLoading: true,
      account_type: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedType = localStorage.getItem("quickeatz_type");
    const storedState = localStorage.getItem("quickeatz");
    if (storedState) {
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
            console.log("Token verified!");
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              account_type: storedType
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

  componentDidUpdate() {
    // To get the navbar to change on load
    // When updating the page, check if we're logged in. THis is more frequent than componentDidMount
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedState) {
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
          if (json.success && !this.state.isLoggedIn) {
            //Prevent loop. ASSUMES LOG OUT WORKS. If logged out when actually logged in, update.
            console.log("Token verified!");
            localStorage.setItem("quickeatz", true);
            this.setState({
              isLoggedIn: true,
              isLoading: false,
              openMenu: false,
            });
          }
        });
    }
  }

  async handleLogout() {
    await logout(this.state.email);
    localStorage.removeItem("quickeatz_token");
    localStorage.removeItem("quickeatz_email");
    localStorage.removeItem("quickeatz_type");
    localStorage.setItem("quickeatz", false);
    this.setState({
      isLoggedIn: false,
      isLoading: false,
    });
    Router.push("/");
  }

  openMenu() {
    this.setState({
      openMenu: true,
    });
  }

  closeMenu() {
    this.setState({
      openMenu: false,
    });
  }

  render() {
    const signedInBar = (
      <div key="signedInNav" className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                onMouseOver={this.openMenu}
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
            {this.state.openMenu && (
              <div
                className="container"
                ref={this.container}
                onMouseLeave={this.closeMenu}
              >
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link href="/profile">
                    <a
                      href="/profile"
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
            <Link href="/createAccount">
              <a
                href="/createAccount"
                className="bg-gray-900 text-white mx-1 px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              >
                Sign Up
              </a>
            </Link>
            <Link href="/login">
              <a
                href="/login"
                className="bg-gray-900 text-white mx-1 px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              >
                Log In
              </a>
            </Link>
          </div>
        </div>
      </>
    );

    return (
      <div className="shadow-md">
        <Head>
          <link rel="icon" href="images/quickeatzclip.png" />
          <title>QuickEatz</title>
        </Head>
        <nav className="bg-yellow-500 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white font-bungee text-2xl">
                  {" "}
                  <Link href={this.state.isLoggedIn ? "/dashboard" : "/"}>
                    QuickEatz
                  </Link>{" "}
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
                    {this.state.isLoggedIn && (
                      <Link href="/vendorLookup">
                        <a
                          href="/vendorLookup"
                          className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                        >
                          Vendors
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
