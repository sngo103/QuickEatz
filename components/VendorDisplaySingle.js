import Head from "next/head";
import React from "react";
import Router from "next/router";

export class VendorDisplaySingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      vendor_id: "",
      vendor_name: "",
      vendor_menu: [],
      vendor_cuisine: "",
      vendor_firstname: "",
      vendor_lastname: "",
      vendor_review_ids: [],
      vendor_review_list: [],
      vendor_rating: "",
      vendor_website: "",
      vendor_phone: "",
      vendor_location: "",
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
    if (this.state.vendor_id == "") {
      //This MAY be bad practice, but it works and shouldnt cause any loops, unless you go to the page directly
      const vendor_id = Router.query.vendor_id;
      console.log("VENDOR HEERE");
      console.log(vendor_id);
      console.log(typeof vendor_id);
      const vendor = fetch(`/api/getVendorSingle?_id=${vendor_id}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_menu: json.menu,
            vendor_cuisine: json.cuisine,
            vendor_firstname: json.first_name,
            vendor_lastname: json.last_name,
            vendor_rating: json.average_rating,
            vendor_review_ids: json.reviews,
            vendor_website: json.website,
            vendor_phone: json.phone_number,
            vendor_location: json.current_location.coordinates,
          }),
            console.log("I helped!"),
            console.log(json),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the username of the reviewer for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.customer_name = c_json.username),
                          console.log("HERE1."),
                          this.setState({
                            vendor_review_list: [
                              ...this.state.vendor_review_list,
                              r_json,
                            ],
                          });
                      }); //Get the name specifically
                  })
                  .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
            );
        });
    }
  }

  componentDidUpdate() {
    //  console.log(this.state.vendor_id.length);
    if (this.state.vendor_id.length == 0 && !this.state.isLoggedIn) {
      //This MAY be bad practice, but it works and shouldnt cause any loops, unless you go to the page directly
      const vendor_id = Router.query.vendor_id;
      console.log("VENDOR HERE");
      console.log(vendor_id);
      console.log(typeof vendor_id);
      const vendor = fetch(`/api/getVendorSingle?_id=${vendor_id}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_menu: json.menu,
            vendor_cuisine: json.cuisine,
            vendor_firstname: json.first_name,
            vendor_rating: json.average_rating,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
            vendor_review_list: [], //RESET TO STOP DUPES, MAY NOT ACTUALLY WORK
            vendor_website: json.website,
            vendor_phone: json.phone_number,
            vendor_location: json.current_location.coordinates,
          }),
            console.log("I helped!"),
            console.log(json),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the username of the reviewer for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.customer_name = c_json.username),
                          console.log("HERE2."),
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
    }
  }

  render() {
    let revs = this.state.vendor_review_list;

    return (
      <>
        <Head>
          <title>{this.state.vendor_name}</title>
        </Head>
        <body className="font-pridi text-center">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 m-4 w-3/4">
              <div className="text-left p-5">
                <h1 className="text-5xl">{this.state.vendor_name}</h1>
                <br />
                <br />
                <div className="text-left text-lg">
                  <h2 className="font-semibold">
                    Proudly Owned by {this.state.vendor_firstname}{" "}
                    {this.state.vendor_lastname}
                  </h2>
                  <div className="inline-flex font-semibold">Address: </div>
                  <>
                    {" "}
                    ({this.state.vendor_location[0]},{" "}
                    {this.state.vendor_location[1]})
                  </>
                  <br />
                  <div className="inline-flex font-semibold">Cuisine: </div>
                  <> {this.state.vendor_cuisine}</>
                  <br />
                  <div className="inline-flex font-semibold">
                    Average Rating:
                  </div>
                  {this.state.vendor_rating == -1 ? (
                    <> Pending </>
                  ) : (
                    <> {this.state.vendor_rating} Stars</>
                  )}
                  <br />
                  <div className="inline-flex font-semibold">Phone Number:</div>
                  <> {this.state.vendor_phone} </>
                  <br />
                  <div className="inline-flex font-semibold">Website:</div>{" "}
                  <a
                    className="font-semibold text-yellow-400 hover:text-yellow-500"
                    href={this.state.vendor_website}
                  >
                    {this.state.vendor_website}
                  </a>
                  <br />
                  <br />
                  {this.state.account_type == "customer" ? (
                    <div>
                      <button
                        className="text-lg border-2 border-black rounded-md px-2 py-1 hover:bg-yellow-500 hover:text-white"
                        onClick={() =>
                          Router.push({
                            pathname: "/writeReview",
                            query: { vendor_id: this.state.vendor_id },
                          })
                        }
                      >
                        {" "}
                        ⭐ Leave a Review{" "}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-center items-center">
                {" "}
                <div className="border-4 w-full border-double border-black p-2 pl-4 pr-4 m-5">
                  <h2 className="text-3xl pb-1">Menu</h2>
                  <hr />
                  <ul>
                    {this.state.vendor_menu.map((menu_item) => (
                      <li className="pb-1">
                        <h2>
                          <strong>{menu_item.food_name}</strong>
                          <br />
                          {menu_item.desc}{" "}
                          {menu_item.desc.trim() ? <br /> : null}
                          <strong>Price:</strong> ${menu_item.price.toFixed(2)}
                        </h2>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-2 border-black mx-14" />
          <br />
          <div className="flex justify-center items-center">
            <div className="border-2 border-black w-2/3 p-2 pt-4">
              <h2 className="text-3xl pb-2">➖ Reviews ➖</h2>
              {revs.length == 0 && (
                <p className="text-md font-semibold">
                  There are no reviews for this vendor.
                </p>
              )}
              <ul>
                {revs.map((review) => (
                  <>
                    <li className="text-md p-2 border-2 text-left font-semibold shadow-sm">
                      <strong> User {review.customer_name} </strong>
                      <br /> ⭐{review.rating} Stars{" "}
                      <div className="float-right font-bold">
                        {new Date(review.created_at).toLocaleDateString()}{" "}
                        {new Date(review.created_at).toLocaleTimeString()}
                      </div>
                      <p className="font-normal">{review.review_content}</p>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </body>
      </>
    );
  }
}
export default VendorDisplaySingle;
