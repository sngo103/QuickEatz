import React from "react";
import Router from "next/router";
import Image from "next/image";
import MapContainerNearbyVendorPin from "./MapContainerNearbyVendorPin";

export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      cust_id: "",
      cust_name: "Empty",
      cust_email: "",
      cust_firstname: "",
      cust_lastname: "",
      cust_review_ids: [],
      cust_review_list: [],
      cust_nearby_vendors: [],
      isLoggedIn: false,
      isLoading: true,
    };
    this.setCoordinates = this.setCoordinates.bind(this);
    // this.handleMapSubmit = this.handleMapSubmit.bind(this);
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

      const cust = fetch(`/api/getCustomerSingleEmail?email=${storedEmail}`) //Get the customer's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            cust_id: json._id,
            cust_name: json.username,
            cust_email: json.email,
            cust_firstname: json.first_name,
            cust_lastname: json.last_name,
            cust_review_ids: json.reviews,
          }),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getVendorSingle?_id=${r_json.vendor_id}`) //Get the Vendor name of the reviewee for readability
                      .then((v_data) => v_data.json())
                      .then((v_json) => {
                        (r_json.vendor_name = v_json.business_name),
                          this.setState({
                            cust_review_list: [
                              ...this.state.cust_review_list,
                              r_json,
                            ],
                          });
                      }); //Get the name specifically
                  })
                  .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table, but referenced for some reason
            )
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login");
    }
  }

  async setCoordinates(coord_pair) {
    console.log(coord_pair);
    this.setState({
      lat: coord_pair.latitude,
      lng: coord_pair.longitude,
    });
    await fetch(
      `/api/searchLatLon?latitude=${coord_pair.latitude}&longitude=${
        coord_pair.longitude
      }&limit=${3}`
    )
      .then((data) => data.json())
      .then((json) => {
		 json.forEach((vend) => {
			let lattt = vend.current_location.coordinates[0];
            let lonnn = vend.current_location.coordinates[1];
            let formatted_location = fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lattt},${lonnn}&key=AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4`
                    )
                          .then((coordData) => coordData.json())
                          .then(
                            (finalData) => {
								let loc_obj = vend;
								vend.loc = finalData.results[0].formatted_address;
								this.setState({
								  cust_nearby_vendors: [...this.state.cust_nearby_vendors, vend],
							})
							}
                          );
		 }
		 )
        
      });
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
        <div className="font-pridi">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <div className="border-2 p-2 font-semibold border-yellow-500 rounded-sm text-center">
                  <p>
                    Set a pin at your location. Nearby vendors will be
                    displayed, and more info can be found by clicking on them.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center py-6">
                <MapContainerNearbyVendorPin
                  onGPSChange={this.setCoordinates}
                  containerStyle={{
                    position: "relative",
                  }}
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
                  style={{ height: "500px", width: "800px" }}
                />
                {this.state.cust_nearby_vendors.length == 0 ? null : (
                  <div className="w-full font-pridi">
                    <div className="border-2 border-b-0.5 border-black bg-yellow-500 bg-opacity-50 w-full mx-2 p-2 font-pridi font-semibold text-xl text-center">
                      Nearby Vendors
                    </div>
                    <div className="overflow-y-auto max-h-96 mx-2 border-2 border-black grid grid-cols-1 w-full max-h-96 h-auto border">
                      {this.state.cust_nearby_vendors.map((vendor) => {
                        {/* let lat = vendor.current_location.coordinates[0];
                        let long = vendor.current_location.coordinates[1];
                        let formatted_location = fetch(
                          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyClhKv-XaZs679aVBkHB2dqTsQ1asckVx4`
                        )
                          .then((coordData) => coordData.json())
                          .then(
                            (finalData) =>
                              finalData.results[0].formatted_address
                          ); */}
                        return (
                          <div className="p-2 border-b-2">
                            <button
                              className="w-full text-md border-2 border-black rounded-sm px-2 text-left font-bold hover:bg-yellow-100"
                              onClick={() =>
                                Router.push({
                                  pathname: "/viewVendorSingle",
                                  query: { vendor_id: vendor._id },
                                })
                              }
                            >
                              {vendor.business_name}
                              <div className="align-middle float-right">
                                <Image
                                  src="/images/right.png"
                                  width={30}
                                  height={15}
                                />
                              </div>
                            </button>
                            <br />
                            <strong>Website: </strong>
                            {vendor.website}
                            <br />
                            <strong>Cuisine: </strong>
                            {vendor.cuisine}
                            <br />
							<strong>Location: </strong>
                            {vendor.loc}
                            <br />
                            {vendor.average_rating == -1 ? (
                              <>No Ratings Yet</>
                            ) : (
                              <strong>
                                Rated {vendor.average_rating} Stars
                              </strong>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="max-w-7xl mx-auto py-6">
              <div className="text-3xl font-bold px-4">My Reviews</div>
              <div className="justify-center items-centerpx-4 py-6">
                <div className="text-center p-4 border-4 border-yellow-600 rounded-lg">
                  {this.state.cust_review_list.length == 0 && (
                    <p>You haven't made any reviews.</p>
                  )}
                  <ul>
                    {this.state.cust_review_list.sort((review1, review2) => review2.created_at - review1.created_at).map((review) => (
                      <li className="text-left border-double border-2 border-yellow-400 p-2">
                        <p className="font-semibold text-xl">
                          {review.vendor_name}
                        </p>
                        <p className="inline-block pr-2 font-semibold">
                          Your Rating:{" "}
                        </p>
                        {review.rating} Stars <br />
                        <p className="inline-block pr-2 font-semibold">
                          Your Review:{" "}
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
