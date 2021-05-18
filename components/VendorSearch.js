import React from "react";
import Image from "next/image";
import Router from "next/router";

class VendorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      cuisine_mode: false,
      rating_mode: false,
      alph_mode: true,
      vendor_results: [],
      vendor_cuisines: [],
      cuisine_search: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAlphClick = this.onAlphClick.bind(this);
    this.onRatingClick = this.onRatingClick.bind(this);
    this.onCuisineClick = this.onCuisineClick.bind(this);
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
            console.log("Token verified!");
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
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: false,
      });
      Router.push("/login");
    }
  }
  async onCuisineClick() {
    await fetch(`/api/getVendorsByCuisine?limit=${3}`)
      .then((data) => data.json())
      .then((json) => {
        //let vendor_list = [],
        /*json.forEach((vendor) => {
				if(vendor_list.includes(vendor.cuisine)){
					//Do nothing, this cuisine's in the list
				}
				else{
					vendor_list.push(vendor.cuisine);
				}
			}),*/
        this.setState({
          vendor_results: json,
          rating_mode: false,
          cuisine_mode: true,
          alph_mode: false,
        });
      });
  }
  async onRatingClick() {
    await fetch(`/api/getVendorsByRating?limit=${3}`)
      .then((data) => data.json())
      .then((json) => {
        this.setState({
          vendor_results: json,
          rating_mode: true,
          cuisine_mode: false,
          alph_mode: false,
        });
      });
  }
  async onAlphClick() {
    await fetch(`/api/getVendorByName?limit=${3}`)
      .then((data) => data.json())
      .then((json) => {
        this.setState({
          vendor_results: json,
          rating_mode: false,
          cuisine_mode: false,
          alph_mode: true,
        });
      });
  }

  handleChange(event) {
    const target = event.target;
    if (target.id === "upd_cuisine") {
      this.setState({ cuisine_search: target.value });
    }
  }
  render() {
    if (this.state.isLoading) {
      return <div className="text-center mt-100"> Loading... </div>;
    } else {
      return (
        <div className="font-pridi text-center m-4">
          <div className="text-5xl font-semibold p-3">
            ➖ All Vendors ➖<br />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="font-2xl mx-2 px-2 py-1 border-4 font-semibold border-yellow-300 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-yellow-400 focus:ring-2 focus:ring-offset-2 focus:bg-yellow-300"
              onClick={this.onAlphClick}
            >
              {" "}
              Alphabetical{" "}
            </button>
            <button
              className="font-2xl mx-2 px-2 py-1 border-4 font-semibold border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-yellow-600 focus:text-white focus:ring-2 focus:ring-offset-2 focus:bg-yellow-500"
              onClick={this.onRatingClick}
            >
              {" "}
              Rating{" "}
            </button>
            <button
              className="font-2xl mx-2 px-2 py-1 border-4 font-semibold border-red-400 rounded-md hover:bg-red-400 hover:text-white focus:outline-none focus:ring-red-500 focus:text-white focus:ring-2 focus:ring-offset-2 focus:bg-red-400"
              onClick={this.onCuisineClick}
            >
              {" "}
              Cuisine{" "}
            </button>
          </div>
          <div className="m-3 p-3 border-double border-black border-4">
            {this.state.vendor_results.length == 0 ? (
              <>
                <div className="font-semibold text-2xl">➖ Results ➖</div>
                <hr className="border-2 border-black" />
                <br />
                <p className="text-lg">
                  {" "}
                  Select a filter to display and sort results.{" "}
                </p>
              </>
            ) : (
              <>
                {this.state.cuisine_mode == false ? (
                  <div>
                    {" "}
                    <div className="font-semibold text-2xl">➖ Results ➖</div>
                    <hr className="border-2 border-black" />
                    <br />
                    <div className="grid grid-cols-1 border">
                      {this.state.vendor_results.map((vendor) => (
                        <div className="grid grid-cols-12 border">
                          <div className="flex justify-center items-center p-2 col-span-4 border text-3xl font-semibold">
                            {vendor.business_name}{" "}
                          </div>
                          <div className="p-2 text-left col-span-7 border">
                            <a
                              className="font-semibold text-yellow-400 hover:text-yellow-500"
                              href={vendor.website}
                            >
                              {vendor.website}
                            </a>
                            <h3>{vendor.cuisine}</h3>
                            {vendor.average_rating == -1 ? (
                              <h3>Rating pending</h3>
                            ) : (
                              <h3> Rated {vendor.average_rating} Stars</h3>
                            )}
                          </div>
                          <div className="p-2 col-span-1 border flex justify-center items-center">
                            <button
                              className="flex justify-center items-center border-4 border-yellow-400 rounded-full hover:border-yellow-500 hover:text-white"
                              onClick={() =>
                                Router.push({
                                  pathname: "/viewVendorSingle",
                                  query: { vendor_id: vendor._id },
                                })
                              }
                            >
                              <Image
                                src="/images/right3.png"
                                width={40}
                                height={40}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <form>
                      <div className="text-xl">
                        Which Cuisine? <br />
                      </div>
                      <input
                        type="text"
                        id="upd_cuisine"
                        value={this.state.cuisine_search}
                        onChange={this.handleChange}
                        className="text-md text-center mb-2 w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none font-semibold"
                      />
                    </form>
                    <div className="font-semibold text-2xl">➖ Results ➖</div>
                    <hr className="border-2 border-black" />
                    <br />
                    <div>
                      {" "}
                      <ul>
                        {this.state.vendor_results.map((vendor) => (
                          <>
                            {this.state.cuisine_search == "" ||
                            vendor.cuisine
                              .toLowerCase()
                              .includes(
                                this.state.cuisine_search.toLowerCase()
                              ) ? (
                              <li>
                                <div>
                                  <button
                                    className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
                                    onClick={() =>
                                      Router.push({
                                        pathname: "/viewVendorSingle",
                                        query: { vendor_id: vendor._id },
                                      })
                                    }
                                  >
                                    {" "}
                                    {vendor.business_name}{" "}
                                  </button>
                                </div>
                                <h2>{vendor.website}</h2>
                                <h3>{vendor.cuisine}</h3>
                                {vendor.average_rating == -1 ? (
                                  <h3>Rating pending</h3>
                                ) : (
                                  <h3> Rated {vendor.average_rating} Stars</h3>
                                )}
                              </li>
                            ) : null}
                          </>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }
  }
}

export default VendorSearch;
