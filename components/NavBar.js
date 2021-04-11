import React from "react";
// import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true, account: "customer", openMenu: false
    }

    this.clickMenu = this.clickMenu.bind(this);

    //container = React.createRef();
    //this.clickOutside = this.clickOutside.bind(this);
    //this.openMenu = this.openMenu.bind(this);
    //this.closeMenu = this.closeMenu.bind(this);
  };

  clickMenu() {
    this.setState({
      openMenu: !this.state.openMenu
    });
  }

  /* Comments Here and Above are incomplete code that is to make the dropdown also
  disapear if the user clicks outside of the dropdown instead of only again on it

  clickOutside() {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({ openMenu: false });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickOutside);
  }
 */

  /*
  openMenu(event) {
    event.preventDefault();

    this.setState({
      openMenu: true
    });
    document.addEventListener("click", this.closeMenu)
  }

  closeMenu(event) {
    //if (!this.dropdownMenu.contains(event.target)) {
    if (!event) {
      this.setState({
        openMenu: false
      });
    }
    document.removeEventListener("click", this.closeMenu);
  }
  */

  // state determines if some navbar components render or not 
  render() {
    return (

      <div>

        <style>
          .container {

          }
        </style>

        <nav className="bg-yellow-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white font-bungee text-2xl"> <Link href="/">QuickEatz</Link> </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="/trending"
                      className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                    >
                      Trending
                    </a>
                    {
                      this.state.loggedIn && this.state.account == "customer" &&
                      (
                        <a
                          href="/dashboard"
                          className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                        >
                          Dashboard
                    </a>
                      )
                    }
                    {
                      this.state.loggedIn && this.state.account == "vendor" &&
                      (
                        <a
                          href="/vendorDashboard"
                          className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                        >
                          Dashboard
                      </a>
                      )
                    }
                    {
                      !this.state.loggedIn &&
                      (
                        <a
                          href="/createAccount"
                          className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                        >
                          Sign Up
                        </a>
                      )
                    }
                    {
                      !this.state.loggedIn &&
                      (
                        <a
                          href="/login"
                          className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                        >
                          Log In
                        </a>
                      )
                    }
                  </div>
                </div>
              </div>



              {
                this.state.loggedIn && (
                  <div className="hidden md:block">
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
                      < div className="ml-3 relative">
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
                            <Image src="/images/profile.png" alt="Profile Image" width={32} height={32} />
                          </button>
                        </div>
                        { /*
                      Dropdown menu, show/hide based on menu state.

                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                      */
                        }

                        {
                          this.state.openMenu && (
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
                                <Link href="/logout">
                                  <a
                                    href="/logout"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                  >
                                    Sign out
                              </a>
                                </Link>
                              </div>
                            </div>

                          )}
                      </div>
                    </div>
                  </div >
                )}



              <div className="-mr-2 flex md:hidden">
                {/*<!-- Mobile menu button -->*/}
                <button type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  {/*--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            */}
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {/*
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            */}
                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div >
          </div >

          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Current: "bg-gray-900 text-white", Default: "text-white-300 hover:bg-gray-700 hover:text-white" */}
              <a
                href="#"
                className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Trending
              </a>

              <a
                href="#"
                className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0"></div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-none text-white">
                    tom@example.com
                  </div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  {/* Heroicon name: outline/bell */}
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
              </div>
              <div className="mt-3 px-2 space-y-1">

                <a
                  href="/viewProfile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </a>

                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                >
                  Settings
                </a>

                <a
                  href="/logout"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav >
      </div >
    );
  }
}

export default NavBar;