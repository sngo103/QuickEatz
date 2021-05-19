import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
      account_type: "",
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedType = localStorage.getItem("quickeatz_type");
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
              account_type: storedType,
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
      fetch(`/api/getCustomerSingleEmail?email=${storedEmail}`) //Get the customer's data
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

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Head>
            <title>My Profile</title>
          </Head>

          <div className="p-5 text-center">
            <h1 className="text-3xl">My Profile</h1>
            <Image src="/images/profileicon.jpg" width={220} height={200} />

            <h2 className="font-normal text-3xl">
              Welcome, {this.state.cust_firstname} {this.state.cust_lastname}
            </h2>
            <br />
            <h2 className="p-2 border-red-500 border-4 font-normal text-xl">
              <div className="pb-2 font-semibold">➖ Username ➖</div>
              <div className="border border-yellow-500">
                {this.state.cust_name}
              </div>
              <div className="p-2 font-semibold">➖ Email ➖</div>
              <div className="mb-3 py-1 border border-yellow-500">
                {this.state.cust_email}
              </div>

              {this.state.account_type === "customer" && (
                <>
                  <div className="pb-2 font-semibold">➖ Account Type ➖</div>
                  <div className="border border-yellow-500">Customer</div>
                </>
              )}
            </h2>
            <div className="flex justify-center items-center">
              <Link href="/editCustomerProfile">
                <a
                  href="/editCustomerProfile"
                  className="mx-1 my-3 bg-white text-center text-black px-5 py-3 rounded-md text-sm font-medium border-4 border-red-700 hover:border-red-700 hover:bg-red-700 hover:text-white"
                >
                  Edit Profile
                </a>
              </Link>
              <Link href="/">
                <a
                  className="mx-1 my-3 bg-white text-center text-black px-5 py-3 rounded-md text-sm font-medium border-4 border-yellow-500 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
                  href="/"
                >
                  Return Home
                </a>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
