import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

export default class ViewVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorObj: {},
      isLoggedIn: false,
      isLoading: true,
      account_type: "",
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

      //Get the vendor's information
      const vendor = fetch(`/api/getVendorSingleEmail?email=${storedEmail}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendorObj: json,
          });
        })
        .catch((error) => console.log(error));
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
            <h1 className="pb-1 text-3xl">My Profile</h1>
            <Image src="/images/profileicon.jpg" width={220} height={200} />
            <h2 className="font-normal text-xl">
              Welcome, {this.state.vendorObj.first_name}{" "}
              {this.state.vendorObj.last_name}
            </h2>
            <br />
            <div className="grid grid-cols-9 gap-4 w-full border">
              <div className="self-center col-span-6 p-2 border-black border-4 font-normal text-l">
                <h1 className="text-3xl font-semibold">
                  {this.state.vendorObj.business_name}
                </h1>
                {this.state.vendorObj.average_rating != -1 ? 
				(<div className="font-semibold inline-block">Currently Rated: {this.state.vendorObj.average_rating} Stars</div> ) 
				: (<div className="font-semibold inline-block"> Not rated. </div>)}
                
                <br />
                <div className="font-semibold inline-block">Cuisine: </div> {this.state.vendorObj.cuisine}
                <br />
                <div className="font-semibold inline-block">Hours: </div> {this.state.vendorObj.hours}
                <br />
                <div className="font-semibold inline-block">Public Status: </div> {this.state.vendorObj.is_open
                  ? "Business in Operation! 😃"
                  : "Temporarily Closed. 😢"}
                <br />
                <div className="font-semibold inline-block">Phone Number: </div> {this.state.vendorObj.phone_number}
                <br />
                <div className="font-semibold inline-block">Website: </div> {this.state.vendorObj.website}
                <br />
              </div>
              <div className="col-span-3 border-4 border-double border-black p-2 pl-4 pr-4">
                <h2 className="text-3xl pb-1">Menu</h2>
                <hr />
                <ul>
                  {(this.state.vendorObj.menu || []).map((menu_item) => (
                    <li className="pb-1">
                      <h2>
                        <strong>{menu_item.food_name}</strong>
                        <br />
                        {menu_item.desc} <br />
                        <strong>Price:</strong> ${menu_item.price.toFixed(2)}
                      </h2>
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br />
            <h2 className="p-2 border-red-600 border-4 font-normal text-xl">
              <div className="pb-2 font-semibold">➖ Username ➖</div>
              <div className="border border-yellow-500">
                {this.state.vendorObj.username}
              </div>
              <div className="p-2 font-semibold">➖ Email ➖</div>
              <div className="mb-3 py-1 border border-yellow-500">
                {this.state.vendorObj.email}
              </div>
              {this.state.vendorObj.account_type === "vendor" && (
                <>
                  <div className="pb-2 font-semibold">➖ Account Type ➖</div>
                  <div className="border border-yellow-500">Vendor</div>
                </>
              )}
            </h2>
            <div className="flex justify-center items-center">
              <Link href="/editVendorProfile">
                <a
                  href="/editVendorProfile"
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
            <hr />
            <br /> <footer>🍔 Made By the QuickEatz Team 🍜</footer>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
