import Head from "next/head";
import React from "react";
import Router from "next/router";

export class VendorDisplaySingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      vendor_id: "",
      vendor_name: "Empty",
      vendor_menu: [],
      vendor_cuisine: "Empty",
      vendor_firstname: "",
      vendor_lastname: "",
      vendor_review_ids: [],
      vendor_review_list: [],
      vendor_rating: "",
	  
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedToken && storedEmail && storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(json => {
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
              isLoading: true,
            });
            Router.push("/login")
          }
        });
    } else {
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: false
      })
      Router.push("/login")
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
    console.log("Here's the state!");
    console.log(this.state);
    console.log("Here are the reviews!");
    
	let revs = this.state.vendor_review_list;
	let account_type = typeof window !== 'undefined' ? localStorage.getItem("quickeatz_type") : null;
	console.log(revs.length);
	console.log(this.state.vendor_review_list);
    return (
      <>
        <Head>
          <title>{this.state.vendor_name}</title>
        </Head>
        <body className="text-center">
          <div className="container p-5 text-5xl">
            <h1>{this.state.vendor_name}</h1>
            {this.state.vendor_rating == -1 ? (
              <h2>Rating pending.</h2>
            ) : (
              <h2> Rated {this.state.vendor_rating} out of 5 Stars</h2>
            )}
          </div>

          <h2 className="font-bold">
            Proudly Owned by {this.state.vendor_firstname}{" "}
            {this.state.vendor_lastname}
          </h2>
          <div className="inline-block container border-8 m-10 border-black w-1/2">
            <br />
            <h2 className="text-3xl">Menu</h2>
            <br />
            <ul>
              {this.state.vendor_menu.map((menu_item) => (
                <li>
                  <h2>
                    <strong>{menu_item.food_name}</strong>
                  </h2>
                  <h2>{menu_item.desc}</h2>
                  <h2>
                    <strong>Price:</strong> ${menu_item.price.toFixed(2)}
                  </h2>
                  <br />
                </li>
              ))}
            </ul>
          </div>
		  {this.state.account_type == "customer" ?
          <div>
            <button
              className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
              onClick={() =>
                Router.push({
                  pathname: "/writeReview",
                  query: { vendor_id: this.state.vendor_id },
                })
              }
            >
              {" "}
              Write a Review!{" "}
            </button>
          </div>
		  : null}
          <div>
            <h2 className="text-3xl">Reviews</h2>
            <br />
            {revs.length == 0 && (
              <p>There are no reviews for this vendor.</p>
            )}
            <ul>
              {revs.map((review) => (
                <li>
                  <br />
                  <h2>
                    <strong>
                      {" "}
                      User {review.customer_name} Rated {review.rating} Stars{" "}
                    </strong>
                  </h2>
                  <p>{review.review_content}</p>
                  <br />
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </body>
      </>
    );
  }
}
export default VendorDisplaySingle;