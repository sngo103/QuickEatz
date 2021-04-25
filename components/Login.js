import React, {Component} from "react";
import Image from "next/image";
import { checkLogin, refreshToken } from "../lib/loginFunctions";
import Router from 'next/router';

import jsCookie from "js-cookie";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      password: "",
      account_type: "customer",
      incorrect: false,
	  success: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    if(target.type === "text"){
      this.setState({ email: target.value });
    } else if(target.type === "password"){
      this.setState({ password: target.value });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
	
	console.log(this.state.email, this.state.password, this.state.account_type);
	
    const pass = await checkLogin(this.state.email, this.state.password, this.state.account_type);
    if(pass){
	
      const newToken = await refreshToken(this.state.email);
	  //console.log("HEYO");
	  //console.log(typeof(newToken));
	  //console.log(newToken);
      localStorage.setItem("quickeatz_token", newToken);
      localStorage.setItem("quickeatz_email", this.state.email);
      localStorage.setItem("quickeatz", true);
	  	//New stuff
	 // jsCookie.set(this.state.email, pass.token)
	  this.setState({success: true});
      Router.push("/dashboard");
	  
    } else {
      this.setState({incorrect:true})
    }
  }

  render() {
    return (
      <div className="container inline-block p-6 text-center font-pridi text-lg">
        <Image
          src="/images/quickeatzlogo.png" // Route of the image file
          height={300} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="QuickEatz Logo"
        />
        <h1 className="title text-6xl font-bungee">QuickEatz</h1>
        <br />

        {this.state.incorrect ? <div> Username and/or password incorrect! </div> : null}

        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              className="border-2 border-black"
            />
          </label>
          <br />
          <br />
          <label>
            Password
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="border-2 border-black"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              className="bg-white border-2 border-black rounded-md hover:text-white hover:bg-gray-700 px-3 py-1.5"
              type="submit"
              value="Login"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default LoginForm;
