// import Link from 'next/link'
import React from "react";
import Image from "next/image";
import styles from "../styles/SignUp.module.css"

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

    /*
    <Image
                                src="/images/quickeatzlogo.png" // Route of the image file
                                height={150} // Desired size with correct aspect ratio
                                width={150} // Desired size with correct aspect ratio
                                alt="QuickEatz Logo"
                            />
    */

    render() {
        return (
            <div>
                <div className="container mx-auto px-6 text-center">
                    <div className="mx-auto text-center">
                        <section className={styles.topPage}>


                            <h1 className={styles.logotext}>QuickEatz</h1>


                            <h1 className={styles.title}>Create Account</h1>

                        </section>
                    </div>
                </div>
                <section className={styles.midPage}>
                    <h1 className={styles.message}>Please Select a Vendor or Customer Account </h1>
                </section>

                <section className={styles.bottomPage}>
                    <select className={styles.dropdown}>
                        <option value="Customer">Customer</option>
                        <option value="Vendor">Vendor</option>
                    </select>

                    <br />
                    <br />

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black">Email</h> &emsp; &emsp; &emsp; &ensp;
                            <input className={styles.textbox} type="text"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </label>

                        <br />
                        <br />

                        <label>
                            <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black"> Password</h> &emsp; &emsp;
                            <input className={styles.textbox} type="text"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>

                        <br />
                        <br />

                        <input className="bg-white border-2 border-black rounded-md hover:text-white hover:bg-gray-700 px-3 py-1.5"
                            type="submit" value="Submit" />
                    </form>
                </section>

            </div >
        );
    }

};

export default SignUp;


