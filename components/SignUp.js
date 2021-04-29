import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      account: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChosen = this.handleChosen.bind(this);
  }

  handleChosen() {
    const target = event.target;
    this.setState({ account: target.value });
  }

  handleChange(event) {
    const target = event.target;
    if (target.type === "text") {
      this.setState({ email: target.value });
    } else if (target.type === "password") {
      this.setState({ password: target.value });
    }
  }

  handleSubmit(event) {
    alert(
      "A name was submitted: " +
        this.state.email +
        " and " +
        this.state.password
    );
    event.preventDefault();
  }

  handleChosen(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="container mx-auto px-6 text-center">
        
        </div>
      </div>
    );
  }
}

export default SignUp;
