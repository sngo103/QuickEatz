import React from "react";
import Router from "next/router";
import MapContainerVendorPinInitial from "./MapContainerVendorPinInitial";

export default class VendorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor_id: "",
      vendor_name: "Empty",
      vendor_bname: "",
      vendor_menu: [],
      vendor_cuisine: "Empty",
      vendor_email: "",
      vendor_firstname: "",
      vendor_lastname: "",
      vendor_review_ids: [],
      vendor_review_list: [],
      vendor_rating: "",
      vendor_location: null,
      vendor_address: "",
      isLoggedIn: false,
      isLoading: true,
      lat: null,
      lng: null,
    };
    this.setCoordinates = this.setCoordinates.bind(this);
    this.handleMapSubmit = this.handleMapSubmit.bind(this);
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
            Router.push("/login");
          }
        });
      const vendor = fetch(`/api/getVendorSingleEmail?email=${storedEmail}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.username,
            vendor_menu: json.menu,
            vendor_cuisine: json.cuisine,
            vendor_bname: json.business_name,
            vendor_email: json.email,
            vendor_firstname: json.first_name,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
            vendor_rating: json.average_rating,
            vendor_location: json.current_location,
          }),
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${json.current_location.coordinates[0]},${json.current_location.coordinates[1]}&key=AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4`
            )
              .then((response) => response.json())
              .then((data) => {
                //address_parts = data.results[0].formatted_address;
                this.setState({
                  vendor_address: data.results[0].formatted_address,
                });
              })
              .catch((err) => console.warn(err.message)),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the customer name of the reviewer for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.customer_name = c_json.username),
                          this.setState({
                            vendor_review_list: [
                              ...this.state.vendor_review_list,
                              r_json,
                            ],
                          });
                      }); //Get the name specifically
                  })
                  .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table, but referenced for some reason
            );
        });
    } else {
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login");
    }
  }

  setCoordinates(coord_pair) {
    this.setState({
      lat: coord_pair.latitude,
      lng: coord_pair.longitude,
    });
  }

  async handleMapSubmit() {
    if (this.state.lat != null && this.state.lng != null) {
      const id_str = this.state.vendor_id.toString();
      await fetch(
        `/api/sendLatLon?_id=${id_str}&latitude=${this.state.lat}&longitude=${this.state.lng}`
      );
    } else {
      console.log("Error: POSITION NOT SET");
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
              <div className="justify-center items-centerpx-4 sm:px-0">
                <div className="p-2 mb-4 border-8 font-semibold border-yellow-500 rounded-lg">
                  Your vendor location is currently viewable to customers as
                  <p className="inline-flex mx-2 px-2 border font-normal">
                    {this.state.vendor_address}
                  </p>
                  <p>
                    Latitude:{" "}
                    {this.state.vendor_location != null ? (
                      <div className="inline-flex font-normal">
                        {" "}
                        {this.state.vendor_location.coordinates[0]}{" "}
                      </div>
                    ) : null}
                  </p>
                  <p>
                    Longitude:{" "}
                    {this.state.vendor_location != null ? (
                      <div className="inline-flex font-normal">
                        {" "}
                        {this.state.vendor_location.coordinates[1]}{" "}
                      </div>
                    ) : null}{" "}
                  </p>
                </div>
              </div>
              <div className="px-4 sm:px-0">
                <div className="flex justify-center items-center border-2 mb-4 p-2 font-semibold border-dashed border-yellow-500 rounded-sm">
                  <form className="text-center" onSubmit={this.handleMapSubmit}>
                    <div className="p-2">
                      Place a pin on the map to update your current location.{" "}
                    </div>
                    <button
                      className="justify-left bg-yellow-500 mb-2 px-4 py-1 text-white rounded-md"
                      type="submit"
                    >
                      Update
                    </button>
                    <MapContainerVendorPinInitial
                      onGPSChange={this.setCoordinates}
                      initialCenter={{
                        lat:
                          this.state.vendor_location != null
                            ? this.state.vendor_location.coordinates[0]
                            : 40.7128,
                        lng:
                          this.state.vendor_location != null
                            ? this.state.vendor_location.coordinates[1]
                            : -74.006,
                      }}
                      containerStyle={{
                        position: "relative",
                      }}
                      style={{ height: "60vh", width: "70vw" }}
                    />
                  </form>
                </div>
              </div>
            </div>
            <hr />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="text-3xl font-bold px-4 sm:px-0">
                Latest Reviews By Customers
              </div>
              <div class="items-center justify-center float-right border-yellow-500 rounded-sm border-2 p-2 m-6 w-64">
                <p className="flex-1 text-center text-black font-bold">
                  Current Average Rating
                </p>
                <div className="text-center text-6xl font-bold">
                  {this.state.vendor_rating == -1
                    ? "Pending"
                    : this.state.vendor_rating}
                </div>
                <p className="flex-1 text-center text-black font-normal">
                  From <strong>{this.state.vendor_review_list.length} </strong>
                  Total Reviews
                </p>
              </div>
              <div className="flex flex-col justify-center items-centerpx-4 py-6 sm:px-0">
                <div className="flex-1 text-center border-4 border-yellow-500 rounded-lg h-96">
                  {this.state.vendor_review_list.length == 0 && (
                    <p>You don't have any reviews yet.</p>
                  )}
                  <ul>
                    {this.state.vendor_review_list.map((review) => (
                      <li className="text-left border-double border-2 border-yellow-400 p-2 m-2">
                        <p className="font-semibold text-xl">
                          {review.vendor_name}
                        </p>
                        <p className="inline-block pr-2 font-semibold">
                          Customer Rated:{" "}
                        </p>
                        {review.rating} Stars <br />
                        <p className="inline-block pr-2 font-semibold">
                          Customer Review:{" "}
                        </p>
                        {review.review_content}
                        <div className="float-right font-bold">
                          {new Date(review.created_at).toLocaleDateString()}{" "}
                          {new Date(review.created_at).toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
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
