import React from "react";
import Link from "next/link";
import Image from "next/image";
import MapContainerVendorPin from "../components/MapContainerVendorPin";
import Router from "next/router";

export default class EditVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor_id: "",
      vendor_name: "",
      vendor_business: "",
      vendor_email: "",
      vendor_firstname: "",
      vendor_lastname: "",
      vendor_cuisine: "",
      vendor_hours: "",
      vendor_phonenumber: "",
      vendor_menu: [],
      vendor_website: "",
      vendor_open: false,
      vendor_review_ids: [],
      vendor_review_list: [],
      isLoggedIn: false,
      isLoading: true,
      vendor_new_uname: "",
      vendor_new_email: "",
      vendor_new_firstname: "",
      vendor_new_lastname: "",
      vendor_new_cuisine: "",
      vendor_new_hours: "",
      vendor_new_website: "",
      vendor_new_phonenumber: "",
      vendor_new_menuitem_name: "",
      vendor_new_menuitem_desc: "",
      vendor_new_menuitem_price: "0",
      showing_location: false,
      temp: false, //An idea! If I toggle this useless variable, I can call render whenever I want. Currently unused.
	  usernameInvalid: false,
    };
    //Bind form/button functions to the instance
    this.handleChange = this.handleChange.bind(this);
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
    this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
    this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handleCuisineSubmit = this.handleCuisineSubmit.bind(this);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
    this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
    this.handlePhoneNumberSubmit = this.handlePhoneNumberSubmit.bind(this);
    this.handleMapToggle = this.handleMapToggle.bind(this);
    this.handleOpenBusiness = this.handleOpenBusiness.bind(this);
    this.handleCloseBusiness = this.handleCloseBusiness.bind(this);
    this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
  }

  componentDidMount() {
    //DONT NEED ALL OF THIS, WILL SHAVE DOWN UNNEEDED STUFF
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

      //Get the vendor's information
      const vendor = fetch(`/api/getVendorSingleEmail?email=${storedEmail}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_business: json.business_name,
            vendor_id: json._id,
            vendor_name: json.username,
            vendor_email: json.email,
            vendor_firstname: json.first_name,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
            vendor_hours: json.hours,
            vendor_menu: json.menu,
            vendor_phonenumber: json.phone_number,
            vendor_website: json.website,
            vendor_cuisine: json.cuisine,
            vendor_open: json.is_open,
          }),
            console.log("I helped!"),
            console.log(json),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the customer name of the reviewee for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.vendor_name = c_json.business_name),
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
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login");
    }
  }
  handleChange(event) {
    const target = event.target;
    if (target.id === "upd_email") {
      this.setState({ vendor_new_email: target.value });
    } else if (target.id === "upd_username") {
      this.setState({ vendor_new_uname: target.value });
    } else if (target.id === "upd_firstname") {
      this.setState({ vendor_new_firstname: target.value });
    } else if (target.id === "upd_lastname") {
      this.setState({ vendor_new_lastname: target.value });
    } else if (target.id === "upd_cuisine") {
      this.setState({ vendor_new_cuisine: target.value });
    } else if (target.id === "upd_website") {
      this.setState({ vendor_new_website: target.value });
    } else if (target.id === "upd_hours") {
      this.setState({ vendor_new_hours: target.value });
    } else if (target.id === "upd_phonenumber") {
      this.setState({ vendor_new_phonenumber: target.value });
    } else if (target.id === "add_menu_name") {
      this.setState({ vendor_new_menuitem_name: target.value });
    } else if (target.id === "add_menu_desc") {
      this.setState({ vendor_new_menuitem_desc: target.value });
    } else if (target.id === "add_menu_price") {
      this.setState({ vendor_new_menuitem_price: target.value });
    }
  }

  async handleUserNameSubmit(event) {
    event.preventDefault();
	
    const new_uname = this.state.vendor_new_uname;

    if (new_uname != "") {
      //If the new text isn't blank
	  await fetch("/api/users/checkUsername", { //Check if taken
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: new_uname }),
		})
      .then((res) => res.json())
      .then((json) => {
        if (json.success) { //Not taken
		  //console.log("DONE");
          this.setState({ usernameInvalid: false });
		  const user_email_str = this.state.cust_email;
		  const data = fetch(
			`/api/sendVendorUsername?email=${user_email_str}&uname=${new_uname}`
			);
      this.setState({
        vendor_name: new_uname,
        vendor_new_uname: "",
      });
        } else { //Taken
			//console.log("FAIL");
          this.setState({ usernameInvalid: true });
        }
      });
      
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }

  handleFirstNameSubmit(event) {
    event.preventDefault();
    const new_fname = this.state.vendor_new_firstname;

    if (new_fname != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorFirstname?email=${user_email_str}&firstname=${new_fname}`
      );
      this.setState({
        vendor_firstname: new_fname,
        vendor_new_firstname: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleLastNameSubmit(event) {
    event.preventDefault();
    const new_lname = this.state.vendor_new_lastname;

    if (new_lname != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorLastname?email=${user_email_str}&lastname=${new_lname}`
      );
      this.setState({
        vendor_lastname: new_lname,
        vendor_new_lastname: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleEmailSubmit(event) {
    event.preventDefault();
    const new_email = this.state.vendor_new_email;

    if (new_email != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorEmail?email=${user_email_str}&newemail=${new_email}`
      )
        .then((data) => data.json())
        .then((e_json) => {
          if (e_json.error == null) {
            //If successful
            this.setState({
              vendor_email: new_email,
              vendor_new_email: "",
            });
            localStorage.setItem("quickeatz_email", new_email);
          } else {
            console.log("That email's in use!");
          }
        })
        .catch((error) => console.log(error)); //Log it for now
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleCuisineSubmit(event) {
    event.preventDefault();
    const new_cuisine = this.state.vendor_new_cuisine;
    if (new_cuisine != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorCuisine?email=${user_email_str}&cuisine=${new_cuisine}`
      );
      this.setState({
        vendor_cuisine: new_cuisine,
        vendor_new_cuisine: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleWebsiteSubmit(event) {
    event.preventDefault();
    const new_website = this.state.vendor_new_website;

    if (new_website != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorWebsite?email=${user_email_str}&website=${new_website}`
      );
      this.setState({
        vendor_website: new_website,
        vendor_new_website: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleHoursSubmit(event) {
    event.preventDefault();
    const new_hours = this.state.vendor_new_hours;

    if (new_hours != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorHours?email=${user_email_str}&hours=${new_hours}`
      );
      this.setState({
        vendor_hours: new_hours,
        vendor_new_hours: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handlePhoneNumberSubmit(event) {
    event.preventDefault();
    const new_phonenumber = this.state.vendor_new_phonenumber;

    if (new_phonenumber != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorPhoneNumber?email=${user_email_str}&phonenumber=${new_phonenumber}`
      );
      this.setState({
        vendor_phonenumber: new_phonenumber,
        vendor_new_phonenumber: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }

  handleMapToggle(event) {
    event.preventDefault();
    this.setState({
      showing_location: !this.state.showing_location,
    });
  }
  handleOpenBusiness(event) {
    event.preventDefault();
    const user_email_str = this.state.vendor_email;
    const data = fetch(`/api/sendVendorOpen?email=${user_email_str}`);
    this.setState({
      vendor_open: true,
    });
  }
  handleCloseBusiness(event) {
    event.preventDefault();
    const user_email_str = this.state.vendor_email;
    const data = fetch(`/api/sendVendorClose?email=${user_email_str}`);
    this.setState({
      vendor_open: false,
    });
  }
  handleAddMenuItem(event) {
    event.preventDefault();
    const food_name = this.state.vendor_new_menuitem_name;
    const desc = this.state.vendor_new_menuitem_desc;
    const price = this.state.vendor_new_menuitem_price;
    if (food_name != "" && desc != "" && price != "") {
      //If the new text isn't blank
      const user_email_str = this.state.vendor_email;
      const data = fetch(
        `/api/sendVendorMenuItem?email=${user_email_str}&food_name=${food_name}&desc=${desc}&price=${price}`
      );
      this.setState({
        vendor_new_menuitem_desc: "",
        vendor_new_menuitem_name: "",
        vendor_new_menuitem_price: "0",
      });
      Router.reload(); //FORCE A RELOAD TO UPDATE THE MENU, TEMPORARY SOLUTION UNTIL SOMETHING BETTER FOUND
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }

  render() {
    return (
      <div>
        <Link href="/profile">
          <a
            href="/profile"
            className="float-left bg-white text-black m-4 px-5 py-3 rounded-md text-sm font-medium border-4 
			  border-yellow-500 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white"
          >
            Back to My Profile
          </a>
        </Link>
        <br />
        <br />
        <br />
        <section className="text-center p-5">
          <h1 className="text-3xl">
            <div className="inline-flex align-top font-semibold px-2 pt-1">
              Edit User Profile
            </div>
            <Image src="/images/profileuser.png" width={40} height={40} />
            <Image src="/images/editpen.png" width={40} height={40} />
            <h2 className="text-xl pb-1"> What would you like to edit?</h2>
          </h1>

          <form onSubmit={this.handleUserNameSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_username">
              Username
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current Username:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_name}
              </div>
            </p>
			{this.state.usernameInvalid == true ? <p> This name is taken. Please try again. </p> : null}
            <input
              type="text"
              id="upd_username"
              placeholder="New Username"
              value={this.state.vendor_new_uname}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Username
            </button>
          </form>

          <form onSubmit={this.handleEmailSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_email">
              Email
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current Email:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_email}
              </div>
            </p>
            <input
              type="text"
              id="upd_email"
              placeholder="New Email"
              value={this.state.vendor_new_email}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Email
            </button>
          </form>

          <form onSubmit={this.handleFirstNameSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_firstname">
              First Name
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current First Name:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_firstname}
              </div>
            </p>
            <input
              type="text"
              id="upd_firstname"
              placeholder="New First Name"
              value={this.state.vendor_new_firstname}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change First Name
            </button>
          </form>

          <form onSubmit={this.handleLastNameSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_lastname">
              Last Name
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current Last Name:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_lastname}
              </div>
            </p>
            <input
              type="text"
              id="upd_lastname"
              placeholder="New Last Name"
              value={this.state.vendor_new_lastname}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change last Name
            </button>
          </form>

          <br />
          <hr />
          <br />
          <h1 className="text-3xl">
            <div className="inline-flex align-top font-semibold px-2 pt-1">
              Edit Business Profile
            </div>
            <Image src="/images/business.png" width={37} height={40} />
            <Image src="/images/editpen.png" width={40} height={40} />
            <h2 className="text-xl pb-1"> What would you like to edit?</h2>
          </h1>

          <p className="font-normal text-3xl mt-2">
            ➖ {this.state.vendor_business} ➖
          </p>
          <text className="text-xs italic">
            *Please contact the QuickEatz team if you'd like to change your
            business name.
          </text>
          <form onSubmit={this.handleCuisineSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_lastname">
              Cuisine
            </label>
            <br />

            <input
              type="text"
              id="upd_cuisine"
              placeholder="New Cuisine"
              value={this.state.vendor_new_cuisine}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Cuisine
            </button>
          </form>

          <form onSubmit={this.handleWebsiteSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_lastname">
              Website
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current Website:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_website}
              </div>
            </p>
            <input
              type="text"
              id="upd_website"
              placeholder="New Website"
              value={this.state.vendor_new_website}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Website
            </button>
          </form>

          <form onSubmit={this.handleHoursSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_hours">
              Hours
            </label>
            <br />
            <p>Current Hours: </p>
            <p className="font-normal text-xl m-2">
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_hours}
              </div>
            </p>
            <input
              type="text"
              id="upd_hours"
              placeholder="New Hours"
              value={this.state.vendor_new_hours}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Hours
            </button>
          </form>

          <form onSubmit={this.handlePhoneNumberSubmit}>
            <br />
            <label className="font-semibold text-xl" for="upd_phonenumber">
              Phone Number
            </label>
            <br />
            <p className="font-normal text-xl m-2">
              Current Phone Number:
              <div className="inline-flex border px-2 mx-2">
                {this.state.vendor_phonenumber}
              </div>
            </p>
            <input
              type="text"
              id="upd_phonenumber"
              placeholder="New Phone Number"
              value={this.state.vendor_new_phonenumber}
              onChange={this.handleChange}
              className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
            />
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              type="submit"
            >
              Change Phone Number
            </button>
          </form>
          <br />

          <p className="font-normal text-xl m-2">
            Public Operation Status:
            <div className="inline-flex border px-2 mx-2">
              {this.state.vendor_open
                ? "Business in Operation! 😃"
                : "Temporarily Closed. 😢"}
            </div>
          </p>
          {this.state.vendor_open ? (
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              onClick={this.handleCloseBusiness}
            >
              Update Business to Closed
            </button>
          ) : (
            <button
              className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
              onClick={this.handleOpenBusiness}
            >
              Update Business to Open
            </button>
          )}
          <br />
		  <br />
          <div className="inline-flex border text-l m-2 italic font-semibold">*Check and change your current business location by going to your dashboard.</div>
          <br />
          <div className="text-3xl m-2">Current Menu</div>
          <div className="inline-block border-4 p-2 border-black w-1/2 text-left">
            <ul>
              {this.state.vendor_menu.map((menu_item) => (
                <li className="m-2">
                  <h2>
                    <strong>{menu_item.food_name}</strong>
                  </h2>
                  <button
                    onClick={() => {
                      fetch(
                        `/api/removeVendorMenuItem?email=${this.state.vendor_email}&food_name=${menu_item.food_name}&desc=${menu_item.desc}&price=${menu_item.price}`
                      );
                      Router.reload(); //FORCE PAGE REFRESH TO UPDATE MENU, VERY TEMPORARY
                    }}
                    className="float-right border-black border p-1 hover:bg-red-500 hover:bg-opacity-25"
                  >
                    ❌ Remove {menu_item.food_name}?
                  </button>
                  <h2>{menu_item.desc}</h2>
                  <h2 className="pb-2">
                    <strong>Price:</strong> ${menu_item.price}
                  </h2>
                  <hr className="border border-black bg-black" />
                </li>
              ))}
            </ul>
            <form
              className="m-2 p-2 text-left border-2"
              onSubmit={this.handleAddMenuItem}
            >
              <div className="font-semibold text-xl text-center pb-1">
                Edit Menu
              </div>
              <div className="my-1">
                <text className="font-semibold">Item Name: </text>
                <input
                  type="text"
                  id="add_menu_name"
                  placeholder="Menu Item Name"
                  value={this.state.vendor_new_menuitem_name}
                  onChange={this.handleChange}
                  className="text-sm w-1/2 border-2 border-black rounded-sm px-1 focus:outline-none"
                />
              </div>
              <div className="my-1">
                <text className="font-semibold">Price: $</text>
                <input
                  id="add_menu_price"
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={this.handleChange}
                  value={parseFloat(this.state.vendor_new_menuitem_price)}
                  className="text-sm p-1 mx-2 w-1/3 border-2 border-black rounded-sm px-1 focus:outline-none"
                />
              </div>
              <div className="my-1">
                <div className="inline-flex font-semibold align-top">
                  Item Description:{" "}
                </div>
                <textarea
                  id="add_menu_desc"
                  placeholder="Menu Item Description"
                  value={this.state.vendor_new_menuitem_desc}
                  onChange={this.handleChange}
                  className="text-sm p-1 mx-2 w-2/3 border-2 border-black rounded-sm px-1 focus:outline-none"
                />
              </div>
              <div className="text-center mt-2">
                <button
                  className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white focus:outline-none"
                  type="submit"
                >
                  Add New Menu Item
                </button>
              </div>
            </form>
          </div>
          <br />
        </section>
        <hr />
        <br />
        <footer className="text-center">
          🍔 Made By the QuickEatz Team 🍜
        </footer>
        <br />
      </div>
    );
  }
}
