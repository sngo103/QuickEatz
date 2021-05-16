import React from "react";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";

export default class EditCustomerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_id: "",
      cust_name: "",
      cust_email: "",
      cust_firstname: "",
      cust_lastname: "",
      cust_review_ids: [],
      cust_review_list: [],
      isLoggedIn: false,
      isLoading: true,
      cust_new_uname: "",
      cust_new_email: "",
      cust_new_firstname: "",
      cust_new_lastname: "",
	  usernameInvalid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
    this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
    this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
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
  handleChange(event) {
    const target = event.target;
    if (target.id === "upd_email") {
      this.setState({ cust_new_email: target.value });
    } else if (target.id === "upd_username") {
      this.setState({ cust_new_uname: target.value });
    } else if (target.id === "upd_firstname") {
      this.setState({ cust_new_firstname: target.value });
    } else if (target.id === "upd_lastname") {
      this.setState({ cust_new_lastname: target.value });
    }
  }
  
  async handleUserNameSubmit(event) {
    event.preventDefault();
	
    const new_uname = this.state.cust_new_uname;

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
			`/api/sendCustomerUsername?email=${user_email_str}&uname=${new_uname}`
			);
      this.setState({
        cust_name: new_uname,
        cust_new_uname: "",
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
    const new_fname = this.state.cust_new_firstname;

    if (new_fname != "") {
      //If the new text isn't blank
      const user_email_str = this.state.cust_email;
      const data = fetch (
        `/api/sendCustomerFirstname?email=${user_email_str}&firstname=${new_fname}`
      );
      this.setState({
        cust_firstname: new_fname,
        cust_new_firstname: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleLastNameSubmit(event) {
    event.preventDefault();
    const new_lname = this.state.cust_new_lastname;

    if (new_lname != "") {
      //If the new text isn't blank
      const user_email_str = this.state.cust_email;
      const data = fetch(
        `/api/sendCustomerLastname?email=${user_email_str}&lastname=${new_lname}`
      );
      this.setState({
        cust_lastname: new_lname,
        cust_new_lastname: "",
      });
    } else {
      console.log("This is empty! Bad to submit!");
    }
  }
  handleEmailSubmit(event) {
    event.preventDefault();
    const new_email = this.state.cust_new_email;

    if (new_email != "") {
      //If the new text isn't blank
      const user_email_str = this.state.cust_email;
      const data = fetch(
        `/api/sendCustomerEmail?email=${user_email_str}&newemail=${new_email}`
      )
        .then((data) => data.json())
        .then((e_json) => {
          if (e_json.error == null) {
            //If successful
            this.setState({
              cust_email: new_email,
              cust_new_email: "",
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

  render() {
    return (
      <>
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

          <section className="text-center p-5">
            <h1 className="text-3xl">
              <Image src="/images/editpen.png" width={40} height={40} />
              <div className="inline-flex align-top font-semibold px-2 pt-1">
                Edit Profile
              </div>
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
                <div className="inline-flex border px-2 mx-2">{this.state.cust_name}</div>
              </p>
			  {this.state.usernameInvalid == true ? <p> This name is taken. Please try again. </p> : null}
              <input
                type="text"
                id="upd_username"
                placeholder="New Username"
                value={this.state.cust_new_uname}
                onChange={this.handleChange}
                className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
              />
              <button
                className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white"
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
                <div className="inline-flex border px-2 mx-2">{this.state.cust_email}</div>
              </p>
              <input
                type="text"
                id="upd_email"
                placeholder="New Email"
                value={this.state.cust_new_email}
                onChange={this.handleChange}
                className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
              />
              <button
                className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white"
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
                <div className="inline-flex border px-2 mx-2">{this.state.cust_firstname}</div>
              </p>
              <input
                type="text"
                id="upd_firstname"
                placeholder="New First Name"
                value={this.state.cust_new_firstname}
                onChange={this.handleChange}
                className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
              />
              <button
                className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white"
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
                <div className="inline-flex border px-2 mx-2">{this.state.cust_lastname}</div>
              </p>
              <input
                type="text"
                id="upd_lastname"
                placeholder="New Last Name"
                value={this.state.cust_new_lastname}
                onChange={this.handleChange}
                className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
              />
              <button
                className="text-md border-2 border-green-600 rounded-md px-2 mx-2 hover:bg-green-600 hover:text-white"
                type="submit"
              >
                Change last Name
              </button>
            </form>
		  <br />
		  <hr />
		  <br />
		  <footer>🍔 Made By the QuickEatz Team 🍜</footer>
          </section>
        </div>
      </>
    );
  }
}
