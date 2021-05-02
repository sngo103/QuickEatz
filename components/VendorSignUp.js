import React from "react";
import Router from "next/router";

class VendorSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInvalid: false,
      currentPass: "",
      passMatch: true,
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.checkPass = this.checkPass.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: "thelemonadestand",
      password: "lemonadeisthebest",
      first_name: "Fruit5",
      last_name: "Lemon",
      email: "fruit50@lemons.com",
      business_name: "Lulu's Lemonade Stand",
      phone_number: "7185550101",
      website: "lululemonade.com",
      xCor: 40.85088985991754,
      yCor: -73.97110926821726,
      hours: "monfri 10am-8pm",
      cuisine: "American",
      menu: [
        {
          food_name: "Froggy Apple Crumple Thumpkin",
          desc: "It's kinda like a quische. Maybe a casserole?",
          price: 19.99,
          in_stock: true,
        },
      ],
      is_open: false,
    };
    await fetch("/api/users/vendors/new_vendor", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: event.target.value }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({ usernameInvalid: false });
        } else {
          this.setState({ usernameInvalid: true });
        }
      });
  }

  async checkUsername(event) {
    await fetch("/api/users/checkUsername", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: event.target.value }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({ usernameInvalid: false });
        } else {
          this.setState({ usernameInvalid: true });
        }
      });
  }

  handlePass(event) {
    this.setState({ currentPass: event.target.value });
  }

  checkPass(event) {
    const inputPass = event.target.value;
    if (inputPass != this.state.currentPass) {
      this.setState({ passMatch: false });
    } else {
      this.setState({ passMatch: true });
    }
  }

  render() {
    return (
      <div>
        <div className="inline-block py-3 px-7 m-2 font-pridi text-left text-lg border outline-none ring-2 ring-offset-2 ring-yellow-600 w-1/2">
          <h1 className="text-center title mt-2 mb-4 text-4xl font-bold font-bungee">
            Vendor Account
          </h1>

          <div className="font-bold">
            <form onSubmit={this.handleSubmit} id="vendorSignUp">
              *First Name
              <input
                name="first_name"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
              />
              <br />
              *Last Name
              <input
                name="last_name"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
              />
              <br />
              *Email Address
              <input
                name="email"
                type="email"
                required
                className="m-2 px-2 border rounded-md"
              />
              <br />
              *Business Name
              <input
                name="business_name"
                type="text"
                required
                className="w-2/4 m-2 px-2 border rounded-md"
              />
              <br />
              *Business Address
              <input
                name="business_address"
                type="text"
                required
                className="w-3/4 m-2 px-2 border rounded-md"
              />
              <br />
              Phone Number
              <input
                name="phone"
                type="tel"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                className="w-32 m-2 px-2 border rounded-md"
              />
              <div className="text-l font-normal pt-3 float-right">
                {" "}
                (entered as ###-###-####){" "}
              </div>
              <br />
              Website
              <input
                name="website"
                type="url"
                className="w-5/6 m-2 px-2 border rounded-md"
              />
              <br />
              *Cuisine
              <input
                name="cuisine"
                type="text"
                required
                className="w-2/4 m-2 px-2 border rounded-md"
              />
              <br />
              <div className="flex justify-left items-center">
                *Hours
                <textarea
                  name="hours"
                  form="vendorSignUp"
                  required
                  className="w-3/4 m-2 px-2 border rounded-md"
                />
              </div>
              {/* <div className="flex justify-left items-center">
                *Menu
                <textarea
                  name="menu"
                  required
                  form="vendorSignUp"
                  className="w-3/4 m-2 px-2 border rounded-md"
                />
              </div> */}
              *Username
              <input
                name="username"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.checkUsername}
              />
              {this.state.usernameInvalid ? (
                <div className="text-l p-3 font-normal text-red-500 float-right">
                  Username already taken. 😢{" "}
                </div>
              ) : null}{" "}
              <br />
              *Password
              <input
                name="password"
                type="password"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.handlePass}
              />
              <br />
              *Confirm Password
              <input
                name="confirm_password"
                type="password"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.checkPass}
              />
              {!this.state.passMatch ? (
                <div className="text-l pt-3 font-normal text-red-500 float-right">
                  ❗ Passwords must match!{" "}
                </div>
              ) : null}
              <br />
              <div className="flex items-center justify-center text-center">
                <input
                  type="submit"
                  value="Create Vendor Account"
                  class="w-1/3 justify-center py-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
                />
              </div>
            </form>
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default VendorSignUp;
