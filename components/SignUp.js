import React from "react";
import Image from "next/image";
import CustomerSignUp from "./CustomerSignUp";
import VendorSignUp from "./VendorSignUp";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account_type: "customer",
      customer_class:
        "w-1/3 py-2 mx-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600",
      vendor_class:
        "w-1/3 justify-center py-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600",
    };

    this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
    this.handleVendorSelect = this.handleVendorSelect.bind(this);
  }

  handleCustomerSelect(event) {
    event.preventDefault();
    this.setState({
      account_type: "customer",
      customer_class:
        "w-1/3 justify-center py-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 bg-yellow-400 outline-none ring-2 ring-offset-2 ring-yellow-600",
      vendor_class:
        "w-1/3 py-2 mx-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400",
    });
  }

  handleVendorSelect(event) {
    event.preventDefault();
    this.setState({
      account_type: "vendor",
      vendor_class:
        "w-1/3 justify-center py-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 bg-yellow-400 outline-none ring-2 ring-offset-2 ring-yellow-600",
      customer_class:
        "w-1/3 py-2 mx-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400",
    });
  }

  render() {
    return (
      <div>
        <div className="container inline-block p-6 text-center font-pridi text-lg">
          <Image
            src="/images/quickeatzlogo.png" // Route of the image file
            height={150} // Desired size with correct aspect ratio
            width={150} // Desired size with correct aspect ratio
            alt="QuickEatz Logo"
          />
          <h1 className="title text-6xl font-bungee">QuickEatz</h1>
          <h1 className="title mt-2 mb-4 text-2xl font-bold font-bungee">
            Create Account
          </h1>

          <div class="flex items-center justify-center">
            <div class="w-1/2">
              What kind of account would you like to create? <br />
              <button
                onClick={this.handleCustomerSelect}
                class={this.state.customer_class}
              >
                Customer
              </button>
              <button
                onClick={this.handleVendorSelect}
                class={this.state.vendor_class}
              >
                Vendor
              </button>
            </div>
          </div>
          {this.state.account_type === "vendor" ? (
            <VendorSignUp />
          ) : (
            <CustomerSignUp />
          )}
          <br />
        </div>
      </div>
    );
  }
}

export default SignUp;
