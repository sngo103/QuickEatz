import React from "react";
import Router from "next/router";

class CustomerSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInvalid: false,
      currentPass: "",
      passMatch: true,
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPass = this.checkPass.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
    };
    await fetch("/api/users/customers/new_customer", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.success) {
          console.log("Success!");
        } else {
          console.log("Failed");
        }
      });
  }

  async checkUsername(event){
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
        if(json.success){
          this.setState({usernameInvalid: false})
        } else {
          this.setState({usernameInvalid: true})
        }
      });
  }

  handlePass(event){
    this.setState({ currentPass: event.target.value })
  }

  checkPass(event){
    const inputPass = event.target.value
    if(inputPass != this.state.currentPass){
      this.setState({passMatch : false})
    } else {
      this.setState({passMatch : true})
    }
  }

  render() {
    return (
      <div>
        <div className="inline-block py-3 px-7 m-2 font-bold text-left font-pridi text-lg border w-1/2 outline-none ring-2 ring-offset-2 ring-yellow-600">
          <h1 className="title mt-2 mb-4 text-center text-4xl font-bold font-bungee">
            Customer Account
          </h1>

          <div>
            <form onSubmit={this.handleSubmit}>
              *First Name
              <input
                name="first_name"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
              /><br />
              *Last Name
              <input
                name="last_name"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
              /><br />
              *Email Address
              <input
                name="email"
                type="email"
                autocomplete="email"
                required
                className="m-2 px-2 border rounded-md"
              /><br />
              *Username
              <input
                name="username"
                type="text"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.checkUsername}
              />{this.state.usernameInvalid ? <div className="text-l p-3 font-normal text-red-500 float-right">Username already taken. 😢 </div> : null } <br />
              *Password
              <input
                name="password"
                type="password"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.handlePass}
              /><br />
              *Confirm Password
              <input
                name="confirm_password"
                type="password"
                required
                className="m-2 px-2 border rounded-md"
                onChange={this.checkPass}
              />{!this.state.passMatch ? <div className="text-l pt-3 font-normal text-red-500 float-right">❗ Passwords must match! </div> : null }<br />
              <div className="flex items-center justify-center text-center">
              <input
                type="submit"
                value="Create Customer Account"
                class="w-1/3 py-2 my-2 text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
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

export default CustomerSignUp;
