import React from "react";
import Image from "next/image";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      password: ""
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

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.email + " and " + this.state.password);
    event.preventDefault();
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
