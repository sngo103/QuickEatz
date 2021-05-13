import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

export default class ViewCustomerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_id: "",
      cust_name: "Empty",
      cust_email: "",
      cust_firstname: "",
      cust_lastname: "",
      cust_review_ids: [],
      cust_review_list: [],
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

      //Get the customer's information
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
            console.log("I helped!"),
            console.log(json),
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
            );
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

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Head>
            <title>My Profile</title>
          </Head>

          <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
            <Link href="/editCustomerProfile">Edit my Profile</Link>
          </div>

          <div className="container p-5 text-center">
            <h1 className="text-3xl">View My Customer Profile</h1>
            <br />

            <h2 className="font-bold">
              Welcome, {this.state.cust_firstname} {this.state.cust_lastname}
            </h2>

            <h2 className="font-bold">
              A.K.A {this.state.cust_name}
              {" at "}
              {this.state.cust_email}
            </h2>

            <div>
              <h2 className="text-3xl">Your Reviews</h2>
              <br />
              {this.state.cust_review_list.length == 0 && (
                <p>You haven't made any reviews.</p>
              )}
              <ul>
                {this.state.cust_review_list.map((review) => (
                  <li>
                    <br />
                    <h2>
                      <strong>
                        {" "}
                        Vendor {review.vendor_name} Rated {review.rating} Stars{" "}
                      </strong>
                    </h2>
                    <p>{review.review_content}</p>
                    <br />
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
            <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
              <Link href="/">Return to Home</Link>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
