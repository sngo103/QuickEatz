// import Link from 'next/link'
import React from "react";
import Image from "next/image";
//import "../styles/SignUp.module.css"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleChange(event) {
        const target = event.target;
        if (target.type === "text") {
            this.setState({ email: target.value });
        } else if (target.type === "password") {
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
                <section className="topPage">
                    <Image
                        src="/images/quickeatzlogo.png" // Route of the image file
                        height={100} // Desired size with correct aspect ratio
                        width={100} // Desired size with correct aspect ratio
                        alt="QuickEatz Logo"
                    />
                    <h1 className="title text-6xl font-bungee">QuickEatz</h1>
                    <br />


                    <h1 className="title">Create Account</h1>

                </section>

                <section className="midPage">
                    <h1 className="message">Please Select a Vendor or Customer Account </h1>
                </section>

                <section className="bottomPage">
                    <select className="dropdown">
                        <option value="Customer">Customer</option>
                        <option value="Vendor">Vendor</option>
                    </select>

                    <form onSubmit={this.handleSubmit}>
                        <label className="usernameLabel">
                            Username: <input className="textbox" type="text" name="username"
                                value={this.state.email}
                                onChange={this.handleChange} />
                        </label>

                        <div></div>

                        <label className="passwordLabel">
                            Password: <input className="textbox" type="test" name="password"
                                value={this.state.email}
                                onChange={this.handleChange} />
                        </label>

                        <div></div>

                        <input className="submissionField" type="submit" value="Submit" />
                    </form>
                </section>
            </div>
        );
    }

};

export default SignUp;


