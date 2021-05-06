import React from "react";
import Router from "next/router";
import MapContainerNearbyVendorPin from "./MapContainerNearbyVendorPin"
import MapContainerVendorPin from "./MapContainerVendorPin"
import MapContainerVendorPinInitial from "./MapContainerVendorPinInitial"

class VendorSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInvalid: false,
      currentPass: "",
      passMatch: true,
      item_name: "",
      item_price: 0.00,
      item_desc: "",
      menu: [],
      menuDisplay: [],
      hours: [],
      hoursDisplay: [],
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.checkPass = this.checkPass.bind(this);
    this.handleMenuSubmit = this.handleMenuSubmit.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
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

  handleMenuChange(event){
    event.preventDefault()
    if(event.target.name === "item_name"){
      this.setState({ item_name: event.target.value })
    } else if(event.target.name === "item_price"){
      let price = event.target.value
      console.log("price:", typeof(price))
      this.setState({ item_price: parseFloat(event.target.value) })
    } else if(event.target.name === "item_desc"){
      this.setState({ item_desc: event.target.value })
    }
  }

  handleMenuSubmit(event){
    event.preventDefault()
    const new_item = {
      food_name: this.state.item_name,
      desc: this.state.item_desc,
      price: (this.state.item_price).toFixed(2),
      in_stock: true,
    }
    const newMenu = this.state.menu
    newMenu.push(new_item)
    let newMenuDisplay = this.state.menuDisplay
    let new_xml = <div className="border-b-2 font-normal col-span-1">{this.state.item_name}</div>
    newMenuDisplay.push(new_xml)
    new_xml = <div className="border-b-2 pl-3 font-normal col-span-1">{(this.state.item_price).toFixed(2)}</div>
    newMenuDisplay.push(new_xml)
    new_xml = <div className="border-b-2 font-normal col-span-4">{this.state.item_desc}</div>
    newMenuDisplay.push(new_xml)
    
    this.setState({
      item_name: "",
      item_price: 0,
      item_desc: "",
      menu: newMenu,
      menuDisplay: newMenuDisplay
    })
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
              <div className="font-normal border-2 p-2">
              <div className="flex justify-left items-center font-bold">
                *Hours
              </div>
              <div className="grid grid-cols-6 text-sm border p-1">
              <div className="col-span-2 font-bold">Day</div><div className="col-span-4 font-bold">Hours</div>
              <div className="col-span-2">Monday</div>
              <div className="col-span-2">
              Opens: <input name="mon-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="mon-end" type="time" required />
              </div>
              <div className="col-span-2">Tuesday</div>
              <div className="col-span-2">
              Opens: <input name="tues-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="tues-end" type="time" required />
              </div>
              <div className="col-span-2">Wednesday</div>
              <div className="col-span-2">
              Opens: <input name="wed-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="wed-end" type="time" required />
              </div>
              <div className="col-span-2">Thursday</div>
              <div className="col-span-2">
              Opens: <input name="thurs-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="thurs-end" type="time" required />
              </div>
              <div className="col-span-2">Friday</div>
              <div className="col-span-2">
              Opens: <input name="fri-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="fri-end" type="time" required />
              </div>
              <div className="col-span-2">Saturday</div>
              <div className="col-span-2">
              Opens: <input name="sat-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="sat-end" type="time" required />
              </div>
              <div className="col-span-2">Sunday</div>
              <div className="col-span-2">
              Opens: <input name="fri-start" type="time" required />
              </div>
              <div className="col-span-2">
              Closes: <input name="fri-end" type="time" required />
              </div>
              </div>
              </div>
              <div className="border-2 p-2">
              <div className="flex justify-left items-center">
                *Menu
              </div>
              <div className="grid grid-cols-6 text-sm border p-1">
                <div className="col-span-1">Name</div><div className="col-span-1">Price</div><div className="col-span-4">Description</div>
              {this.state.menuDisplay.map((cell) => cell)}
              </div>
              <div className="text-sm">
              Name: <input name="item_name" value={this.state.item_name} onChange={this.handleMenuChange} type="text" className="m-2 px-2 border rounded-md" required />
              Price: $<input name="item_price" value={this.state.item_price} type="number" min="0" step=".01" onChange={this.handleMenuChange} className="m-2 px-2 border rounded-md" required />
              <div className="flex justify-left items-center">
                Description: <textarea name="item_desc" value={this.state.item_desc} onChange={this.handleMenuChange} className="min-w-min w- m-2 px-2 border rounded-md" />
              </div>
              <button className="px-1 bg-gray-100 hover:bg-gray-300" onClick={this.handleMenuSubmit}>Add Menu Item</button>
              </div>
              </div>
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
