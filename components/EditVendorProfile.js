import React from "react";
import Link from "next/link";
import styles from '../styles/CustomerProfile.module.css';
import MapContainerVendorPin from '../components/MapContainerVendorPin';
<<<<<<< HEAD
import Router from "next/router";
=======
>>>>>>> c1a97cf6148d1f0b40c9e3405eaa3ade127fff21

export default class EditVendorProfile extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      vendor_id: "",
      vendor_name: "Empty",
	  vendor_business: "",
	  vendor_email: "",
      vendor_firstname: "",
      vendor_lastname: "",
	  vendor_cuisine: "",
	  vendor_hours: "",
	  vendor_phonenumber: "",
	  vendor_menu: [],
	  vendor_website: "",
	  vendor_open: false,
      vendor_review_ids: [],
      vendor_review_list: [],
	  isLoggedIn: false,
	  isLoading: true,
	  vendor_new_uname: "",
	  vendor_new_email: "",
	  vendor_new_firstname: "",
	  vendor_new_lastname: "",
	  vendor_new_cuisine: "",
	  vendor_new_hours: "",
	  vendor_new_website: "",
	  vendor_new_phonenumber: "",
	  vendor_new_menuitem_name: "",
	  vendor_new_menuitem_desc: "",
	  vendor_new_menuitem_price: "0",
	  showing_location: false,
	  temp: false, //An idea! If I toggle this useless variable, I can call render whenever I want. Currently unused.
	  
    };
	//Bind form/button functions to the instance
    this.handleChange = this.handleChange.bind(this);
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
	this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
	this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
	this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
	this.handleCuisineSubmit = this.handleCuisineSubmit.bind(this);
	this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
	this.handleHoursSubmit = this.handleHoursSubmit.bind(this);
	this.handlePhoneNumberSubmit = this.handlePhoneNumberSubmit.bind(this);
	this.handleMapToggle = this.handleMapToggle.bind(this);
	this.handleOpenBusiness = this.handleOpenBusiness.bind(this);
	this.handleCloseBusiness = this.handleCloseBusiness.bind(this);
	this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
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
		
		//Get the vendor's information
		const vendor = fetch(`/api/getVendorSingleEmail?email=${storedEmail}`) //Get the vendor's data
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.username,
			vendor_email: json.email,
            vendor_firstname: json.first_name,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
			vendor_hours: json.hours,
			vendor_menu: json.menu,
		    vendor_phonenumber: json.phone_number,
		    vendor_website: json.website,
			vendor_cuisine: json.cuisine,
			vendor_open: json.is_open,
          }),
            console.log("I helped!"),
            console.log(json),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the customer name of the reviewee for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.vendor_name = c_json.business_name),
                          this.setState({
                            vendor_review_list: [
                              ...this.state.vendor_review_list,
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
      this.setState({ vendor_new_email: target.value });
    } else if (target.id === "upd_username") {
      this.setState({ vendor_new_uname: target.value });
    }
	else if (target.id === "upd_firstname") {
      this.setState({ vendor_new_firstname: target.value });
    }
	else if (target.id === "upd_lastname") {
      this.setState({ vendor_new_lastname: target.value });
    }
	else if (target.id === "upd_cuisine") {
      this.setState({ vendor_new_cuisine: target.value });
    }
	else if (target.id === "upd_website") {
      this.setState({ vendor_new_website: target.value });
    }
	else if (target.id === "upd_hours") {
      this.setState({ vendor_new_hours: target.value });
    }
	else if (target.id === "upd_phonenumber") {
      this.setState({ vendor_new_phonenumber: target.value });
    }
	else if (target.id === "add_menu_name") {
      this.setState({ vendor_new_menuitem_name: target.value });
    }
	else if (target.id === "add_menu_desc") {
      this.setState({ vendor_new_menuitem_desc: target.value });
    }
	else if (target.id === "add_menu_price") {
      this.setState({ vendor_new_menuitem_price: target.value });
    }
  }
  
  handleUserNameSubmit(event) {
    event.preventDefault();
    const new_uname = this.state.vendor_new_uname;

	if(new_uname != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorUsername?email=${user_email_str}&uname=${new_uname}`);
		this.setState({ 
			vendor_name: new_uname,
			vendor_new_uname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
   
	
  }
  
  handleFirstNameSubmit(event) {
    event.preventDefault();
    const new_fname = this.state.vendor_new_firstname;

	if(new_fname != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorFirstname?email=${user_email_str}&firstname=${new_fname}`);
		this.setState({ 
			vendor_firstname: new_fname,
			vendor_new_firstname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
   
	
  }
  handleLastNameSubmit(event) {
    event.preventDefault();
    const new_lname = this.state.vendor_new_lastname;

	if(new_lname != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorLastname?email=${user_email_str}&lastname=${new_lname}`);
		this.setState({ 
			vendor_lastname: new_lname,
			vendor_new_lastname: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
    handleEmailSubmit(event) {
    event.preventDefault();
    const new_email = this.state.vendor_new_email;

	if(new_email != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorEmail?email=${user_email_str}&newemail=${new_email}`)
						.then(data => data.json())
						.then((e_json) => {
							if(e_json.error == null){ //If successful
								this.setState({ 
									vendor_email: new_email,
									vendor_new_email: "" });
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
  handleCuisineSubmit(event) {
    event.preventDefault();
    const new_cuisine = this.state.vendor_new_cuisine;
	if(new_cuisine != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorCuisine?email=${user_email_str}&cuisine=${new_cuisine}`);
		this.setState({ 
			vendor_cuisine: new_cuisine,
			vendor_new_cuisine: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
  handleWebsiteSubmit(event) {
    event.preventDefault();
    const new_website = this.state.vendor_new_website;

	if(new_website != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorWebsite?email=${user_email_str}&website=${new_website}`);
		this.setState({ 
			vendor_website: new_website,
			vendor_new_website: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
  handleHoursSubmit(event) {
    event.preventDefault();
    const new_hours = this.state.vendor_new_hours;

	if(new_hours != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorHours?email=${user_email_str}&hours=${new_hours}`);
		this.setState({ 
			vendor_hours: new_hours,
			vendor_new_hours: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
  handlePhoneNumberSubmit(event) {
    event.preventDefault();
    const new_phonenumber = this.state.vendor_new_phonenumber;

	if(new_phonenumber != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorPhoneNumber?email=${user_email_str}&phonenumber=${new_phonenumber}`);
		this.setState({ 
			vendor_phonenumber: new_phonenumber,
			vendor_new_phonenumber: "" });
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
  
  handleMapToggle(event){
	  event.preventDefault();
	  this.setState({
		  showing_location: !this.state.showing_location,
	  });
  }
  handleOpenBusiness(event){
	  event.preventDefault();
	  const user_email_str = this.state.vendor_email;
	  const data = fetch(`/api/sendVendorOpen?email=${user_email_str}`);
	  this.setState({
		  vendor_open: true,
	  });
  }
  handleCloseBusiness(event){
	  event.preventDefault();
	  const user_email_str = this.state.vendor_email;
	  const data = fetch(`/api/sendVendorClose?email=${user_email_str}`);
	  this.setState({
		  vendor_open: false,
	  });
  }
  handleAddMenuItem(event){
	event.preventDefault();
	const food_name = this.state.vendor_new_menuitem_name;
	const desc = this.state.vendor_new_menuitem_desc;
	const price = this.state.vendor_new_menuitem_price;
	if(food_name != "" && desc != "" && price != ""){ //If the new text isn't blank
		const user_email_str = this.state.vendor_email;
		const data = fetch(`/api/sendVendorMenuItem?email=${user_email_str}&food_name=${food_name}&desc=${desc}&price=${price}`);
		this.setState({ 
			vendor_new_menuitem_desc: "",
			vendor_new_menuitem_name: "",
			vendor_new_menuitem_price: "0"});
		Router.reload(); //FORCE A RELOAD TO UPDATE THE MENU, TEMPORARY SOLUTION UNTIL SOMETHING BETTER FOUND
	}
	else{
		console.log("This is empty! Bad to submit!");
	}
  }
    render() {
        return (
            <div>
                <section className={styles.topPage}>
                    <h2 className={styles.title}>Edit Vendor Profile</h2>
                </section>

                <section className={styles.midPage}>
                    <h2> What would you like to edit today?</h2>
                


					<form onSubmit={this.handleUserNameSubmit}>
						<br />
						<label className="text-xl" for="upd_username">
						  Change Username
						</label>
						<br />
						<p>Old Username: {this.state.vendor_name}</p>
						<textarea
						  id="upd_username"
						  placeholder="New Username"
						  value={this.state.vendor_new_uname}
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
						<p>Old Email: {this.state.vendor_email}</p>
						<textarea
						  id="upd_email"
						  placeholder="New email"
						  value={this.state.vendor_new_email}
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
						<p>Old First Name: {this.state.vendor_firstname}</p>
						<textarea
						  id="upd_firstname"
						  placeholder="New first name"
						  value={this.state.vendor_new_firstname}
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
						<p>Old Last Name: {this.state.vendor_lastname}</p>
						<textarea
						  id="upd_lastname"
						  placeholder="New last name"
						  value={this.state.vendor_new_lastname}
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
					  <form onSubmit={this.handleCuisineSubmit}>
						<br />
						<label className="text-xl" for="upd_lastname">
						  Change Cuisine
						</label>
						<br />
						<p>Old Cuisine: {this.state.vendor_cuisine}</p>
						<textarea
						  id="upd_cuisine"
						  placeholder="New cuisine"
						  value={this.state.vendor_new_cuisine}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change Cuisine
						</button>
					  </form>
					  
					  <form onSubmit={this.handleWebsiteSubmit}>
						<br />
						<label className="text-xl" for="upd_lastname">
						  Change Website
						</label>
						<br />
						<p>Old Website: {this.state.vendor_website}</p>
						<textarea
						  id="upd_website"
						  placeholder="New website"
						  value={this.state.vendor_new_website}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change Website
						</button>
					  </form>
					  
					  <form onSubmit={this.handleHoursSubmit}>
						<br />
						<label className="text-xl" for="upd_hours">
						  Change Hours
						</label>
						<br />
						<p>Old Hours: {this.state.vendor_hours}</p>
						<textarea
						  id="upd_hours"
						  placeholder="New hours"
						  value={this.state.vendor_new_hours}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change Hours
						</button>
					  </form>
					  
					  <form onSubmit={this.handlePhoneNumberSubmit}>
						<br />
						<label className="text-xl" for="upd_phonenumber">
						  Change PhoneNumber
						</label>
						<br />
						<p>Old PhoneNumber: {this.state.vendor_phonenumber}</p>
						<textarea
						  id="upd_phonenumber"
						  placeholder="New Phone Number"
						  value={this.state.vendor_new_phonenumber}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Change PhoneNumber
						</button>
					  </form>
					  
					  <form onSubmit={this.handleAddMenuItem}>
						<br />
						<label className="text-xl">
						  Add menu item
						</label>
						<br />
						
						<textarea
						  id="add_menu_name"
						  placeholder="Menu Item Name"
						  value={this.state.vendor_new_menuitem_name}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<textarea
						  id="add_menu_desc"
						  placeholder="Menu Item Description"
						  value={this.state.vendor_new_menuitem_desc}
						  onChange={this.handleChange}
						  className="text-md w-1/4 h-10 border-2 border-black rounded-md p-1"
						/>
						<p> Price (USD): </p>
						<input 
						id="add_menu_price"
						type="number" step="0.01" min="0" 
						onChange={this.handleChange} 
						value={parseFloat(this.state.vendor_new_menuitem_price)} />
						<br />
						<button
						  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
						  type="submit"
						>
						  Add menu item
						</button>
					  </form>
					  <br />
					  <div className="inline-block container border-8 m-10 border-black w-1/2">
						<br />
						<h2 className="text-3xl">Remove Menu Item</h2>
						<br />
							<ul>
							  {this.state.vendor_menu.map((menu_item) => (
								<li>
								  <h2>
									<strong>{menu_item.food_name}</strong>
								  </h2>
								  <h2>{menu_item.desc}</h2>
								  <h2>
									<strong>Price:</strong> {menu_item.price}$
								  </h2>
								  <button onClick={() => {
									  fetch(`/api/removeVendorMenuItem?email=${this.state.vendor_email}&food_name=${menu_item.food_name}&desc=${menu_item.desc}&price=${menu_item.price}`);
									 Router.reload(); //FORCE PAGE REFRESH TO UPDATE MENU, VERY TEMPORARY
									}}>Remove {menu_item.food_name}?</button>
								  <br />
								</li>
							  ))}
							</ul>
						</div>
						<br />
					  {this.state.vendor_open ? 
						<button className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
								onClick={this.handleCloseBusiness}>
									Close Vendor
						</button> :
						<button className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
								onClick={this.handleOpenBusiness}>
									Open Vendor
						</button>
					  }
					  <br />
					  
						<br />
						<button className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
								onClick={this.handleMapToggle}>
									{this.state.showing_location ? "Hide Map" : "Change Current Location"}
					  </button>
					  {this.state.showing_location ? <MapContainerVendorPin /> : null}
				</section >
                <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
              <Link href="/profile">Back to my Profile</Link>
				</div>

            </div >
        )
    }
}
