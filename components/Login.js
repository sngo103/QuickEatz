import React from "react";
import Image from "next/image";
import { checkLogin, refreshToken } from "../lib/loginFunctions";
import Router from "next/router";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      account_type: "customer",
      incorrect: false,
      success: false, 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCustomerLogin = this.toggleCustomerLogin.bind(this);
    this.toggleVendorLogin = this.toggleVendorLogin.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    if (target.type === "email") {
      this.setState({ email: target.value });
    } else if (target.type === "password") {
      this.setState({ password: target.value });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // console.log(this.state.email, this.state.password, this.state.account_type);

    const pass = await checkLogin(
      this.state.email,
      this.state.password,
      this.state.account_type
    );
    if (pass) {
      const newToken = await refreshToken(
        this.state.email,
        this.state.account_type
      );
      localStorage.setItem("quickeatz_token", newToken);
      localStorage.setItem("quickeatz_email", this.state.email);
      localStorage.setItem("quickeatz", true);
      localStorage.setItem("quickeatz_type", this.state.account_type);
      //New stuff
      this.setState({ success: true });
      Router.push("/dashboard");
    } else {
      this.setState({ incorrect: true });
    }
  }

  toggleCustomerLogin() {
    console.log("Switching to customer!");
    this.setState({ account_type: "customer" });
  }

  toggleVendorLogin() {
    console.log("Switching to vendor!");
    this.setState({ account_type: "vendor" });
  }

  render() {
    const customerLogin = (
      <div class="flex items-center justify-center">
        <form class="w-1/2 space-y-6" onSubmit={this.handleSubmit}>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class={this.state.account_type === "customer" ? "appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none ring-4 ring-yellow-300 z-10 sm:text-sm" : "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"}
                placeholder="Email address"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class={this.state.account_type === "customer" ? "appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none ring-4 ring-yellow-300 z-10 sm:text-sm" : "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"}
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
          </div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-yellow-400 group-hover:text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </form>
      </div>
    );

    const vendorLogin = (
      <div class="flex items-center justify-center">
        <form class="w-1/2 space-y-6" onSubmit={this.handleSubmit}>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class={this.state.account_type === "vendor" ? "appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none ring-4 ring-yellow-600 z-10 sm:text-sm" : "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"}
                placeholder="Email address"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class={this.state.account_type === "vendor" ? "appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none ring-4 ring-yellow-600 z-10 sm:text-sm" : "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none"}
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
          </div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-yellow-400 group-hover:text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </form>
      </div>
    );

    return (
      <div className="container inline-block p-6 text-center font-pridi text-lg">
        <Image
          src="/images/quickeatzlogo.png" // Route of the image file
          height={300} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="QuickEatz Logo"
        />
        <h1 className="title text-6xl font-bungee">QuickEatz</h1>
        <h1 className="title mt-2 mb-4 text-2xl font-bold font-bungee">
          Login
        </h1>

        {this.state.incorrect ? (
          <div> Username and/or password incorrect! </div>
        ) : null}

        <div class="flex items-center justify-center">
          <div className="w-full">
            <button
              onClick={this.toggleCustomerLogin}
              class={this.state.account_type === "customer" ? "w-1/4 py-2 px-6 text-sm font-medium text-white rounded-t-md bg-yellow-300 focus:outline-none ring-2 ring-offset-2 ring-yellow-300" : "w-1/4 py-2 px-6 text-sm font-medium text-white rounded-t-md bg-yellow-300 hover:bg-yellow-200 focus:outline-none"}
            >
              Customer
            </button>
            <button
              onClick={this.toggleVendorLogin}
              class={this.state.account_type === "vendor" ? "w-1/4 py-2 px-6 text-sm font-medium text-white rounded-t-md bg-yellow-600 focus:outline-none ring-2 ring-offset-2 ring-yellow-600" : "w-1/4 py-2 px-6 text-sm font-medium text-white rounded-t-md bg-yellow-600 hover:bg-yellow-500 focus:outline-none"}
            >
              Vendor
            </button>
          </div>
        </div>
        {this.state.account_type === "vendor" ? vendorLogin : customerLogin}
      </div>
    );
  }
}

export default LoginForm;
