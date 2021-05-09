import React from "react";
import Router from "next/router";
import Link from "next/link";
import styles from '../styles/CustomerProfile.module.css'

export default class EditCustomerProfile extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      cust_id: "",
      cust_name: "Empty",
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
    };
	
    this.handleChange = this.handleChange.bind(this);
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
	this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
	this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
	this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }
	
	componentDidMount() { //DONT NEED ALL OF THIS, WILL SHAVE DOWN UNNEEDED STUFF
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
	  console.log(JSON.stringify(data));
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(json => {
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
            Router.push("/login")
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
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login")
    }
  }
	handleChange(event) {
    const target = event.target;
    if (target.id === "upd_email") {
      this.setState({ cust_new_email: target.value });
    } else if (target.id === "upd_username") {
      this.setState({ cust_new_uname: target.value });
    }
	else if (target.id === "upd_firstname") {
      this.setState({ cust_new_firstname: target.value });
    }
	else if (target.id === "upd_lastname") {
      this.setState({ cust_new_lastname: target.value });
    }
  }
  
  handleUserNameSubmit(event) {
    event.preventDefault();
    const new_uname = this.state.cust_new_uname;

	if(new_uname != ""){ //If the new text isn't blank
		const user_email_str = this.state.cust_email;
		const data = fetch(`/api/sendCustomerUsername?email=${user_email_str}&uname=${new_uname}`);
		this.setState({ 
			cust_name: new_uname,
			cust_new_uname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
   
	
  }
  
  handleFirstNameSubmit(event) {
    event.preventDefault();
    const new_fname = this.state.cust_new_firstname;

	if(new_fname != ""){ //If the new text isn't blank
		const user_email_str = this.state.cust_email;
		const data = fetch(`/api/sendCustomerFirstname?email=${user_email_str}&firstname=${new_fname}`);
		this.setState({ 
			cust_firstname: new_fname,
			cust_new_firstname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
   
	
  }
  handleLastNameSubmit(event) {
    event.preventDefault();
    const new_lname = this.state.cust_new_lastname;

	if(new_lname != ""){ //If the new text isn't blank
		const user_email_str = this.state.cust_email;
		const data = fetch(`/api/sendCustomerLastname?email=${user_email_str}&lastname=${new_lname}`);
		this.setState({ 
			cust_lastname: new_lname,
			cust_new_lastname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
    handleEmailSubmit(event) {
    event.preventDefault();
    const new_email = this.state.cust_new_email;

	if(new_email != ""){ //If the new text isn't blank
		const user_email_str = this.state.cust_email;
		const data = fetch(`/api/sendCustomerEmail?email=${user_email_str}&newemail=${new_email}`)
						.then(data => data.json())
						.then((e_json) => {
							if(e_json.error == null){ //If successful
								this.setState({ 
									cust_email: new_email,
									cust_new_email: "" });
								localStorage.setItem("quickeatz_email", new_email);
							}
							else{
								console.log("That email's in use!");
							}
						})
						.catch((error) => console.log(error)); //Log it for now
		
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
  
    render() {
        return (
            <div>
                <section className={styles.topPage}>
                    <h2 className={styles.title}>Edit Customer Profile</h2>
                </section>

                <section className={styles.midPage}>
                    <h2> What would you like to edit today?</h2>
                


					<form onSubmit={this.handleUserNameSubmit}>
						<br />
						<label className="text-xl" for="upd_username">
						  Change Username
						</label>
						<br />
						<p>Old Username: {this.state.cust_name}</p>
						<textarea
						  id="upd_username"
						  placeholder="New Username"
						  value={this.state.cust_new_uname}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change Username
						</button>
					  </form>
				  
					<form onSubmit={this.handleEmailSubmit}>
						<br />
						<label className="text-xl" for="upd_email">
						  Change Email
						</label>
						<br />
						<p>Old Email: {this.state.cust_email}</p>
						<textarea
						  id="upd_email"
						  placeholder="New email"
						  value={this.state.cust_new_email}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change Email
						</button>
					  </form>
					<form onSubmit={this.handleFirstNameSubmit}>
						<br />
						<label className="text-xl" for="upd_firstname">
						  Change First Name
						</label>
						<br />
						<p>Old First Name: {this.state.cust_firstname}</p>
						<textarea
						  id="upd_firstname"
						  placeholder="New first name"
						  value={this.state.cust_new_firstname}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change First Name
						</button>
					  </form>
					  <form onSubmit={this.handleLastNameSubmit}>
						<br />
						<label className="text-xl" for="upd_lastname">
						  Change Last Name
						</label>
						<br />
						<p>Old Last Name: {this.state.cust_lastname}</p>
						<textarea
						  id="upd_lastname"
						  placeholder="New last name"
						  value={this.state.cust_new_lastname}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change last Name
						</button>
					  </form>
					  
				</section >
                <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
              <Link href="/profile">Back to my Profile</Link>
				</div>

            </div >
        )
    }
}
