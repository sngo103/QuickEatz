import React from "react";
import Router from "next/router";
import MapContainerVendorPinInitial from "./MapContainerVendorPinInitial";

export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
    };
  }

  componentDidMount() {
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
      Router.push("/login")
    if (this.state.cuisine != "") {
      const cuisine = this.state.cuisine;//Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later

      const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`)
        // get matching cuisine 
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }
    else if (this.state.name != "") {
      const name = this.state.name; //Router.query.name;
      console.log("Vendor Here")
      console.log(name);
      console.log(typeof name);
      // will make it get multiple vendors later
      const vendor = fetch(`/api/getVendorByName?_id=${name}`) // get matching name
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }
  }

  componentDidUpdate() {
    if (this.state.cuisine != "") {
      const cuisine = this.state.cuisine;//Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later
      // const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get cuisine 
      const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get matching cuisine 
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }
    else if (this.state.name != "") {
      const name = this.state.name; //Router.query.name;
      console.log("Vendor Here")
      console.log(name);
      console.log(typeof name);
      // will make it get multiple vendors later
      const vendor = fetch(`/api/getVendorByName?_id=${name}`) // get matching name
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else if (this.state.isLoggedIn) {
      return (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <div className="border-2 p-2 font-semibold border-yellow-500 rounded-sm">
                  <form>
                    What's your current location?
                    <input className="text-black mx-3 w-4/6 focus:outline-none" type="text" />
                    <input className="justify-left bg-yellow-500 px-3 text-white rounded-md" type="submit" value="Search Vendors" />
                  </form>
                </div>
              </div>
              <div className="justify-center items-centerpx-4 py-6 sm:px-0">
                <div className="text-center p-64 border-4 border-dashed border-yellow-500 rounded-lg h-96">
                  Please enter a location!
                </div>
              </div>
            </div>
            <hr />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="text-3xl font-bold px-4 sm:px-0">
                My Reviews
              </div>
              <div className="justify-center items-centerpx-4 py-6 sm:px-0">
                <div className="text-center p-64 border-4 border-yellow-600 rounded-lg h-96">
                  
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    } else {
      Router.push("/login");
    }
  }
}
