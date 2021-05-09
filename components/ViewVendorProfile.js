import React from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

export default class ViewVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor_id: "",
      vendor_name: "Empty",
	  vendor_bname: "",
	  vendor_menu: [],
      vendor_cuisine: "Empty",
	  vendor_email: "",
      vendor_firstname: "",
      vendor_lastname: "",
      vendor_review_ids: [],
      vendor_review_list: [],
	  vendor_rating: "",
	  isLoggedIn: false,
	  isLoading: true,
    };
  }

  componentDidMount() {
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
			vendor_menu: json.menu,
            vendor_cuisine: json.cuisine,
			vendor_bname: json.business_name,
			vendor_email: json.email,
            vendor_firstname: json.first_name,
            vendor_lastname: json.last_name,
            vendor_review_ids: json.reviews,
			vendor_rating: json.average_rating,
          }),
            console.log("I helped!"),
            console.log(json),
            json.reviews.forEach(
              (r_id) =>
                fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
                  .then((r_data) => r_data.json())
                  .then((r_json) => {
                    fetch(`/api/getUserName?_id=${r_json.customer_id}`) //Get the customer name of the reviewer for readability
                      .then((c_data) => c_data.json())
                      .then((c_json) => {
                        (r_json.customer_name = c_json.username),
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

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Head>
            <title>My Profile</title>
          </Head>
		  <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
              <Link href="/editVendorProfile">Edit my Profile</Link>
            </div>
			
          <div className="container p-5 text-center">
            <h1 className="text-3xl">View My Vendor Profile of {this.state.vendor_bname}</h1>
            <br />
			
			<h2 className="font-bold">
				Welcome, {this.state.vendor_firstname}{" "}
				{this.state.vendor_lastname}
			</h2>
			
			<h2 className="font-bold">
				A.K.A {this.state.vendor_name}{" at "}
				{this.state.vendor_email}
			</h2>
			
			<h2 className="font-bold">
				Currently Rated: {this.state.vendor_rating}{" Stars "}
			</h2>
			
			<h2 className="font-bold">
				Cuisine: {this.state.vendor_cuisine}
			</h2>
			
			<div className="inline-block container border-8 m-10 border-black w-1/2">
            <br />
            <h2 className="text-3xl">Menu</h2>
            <br />
				<ul>
				  {this.state.vendor_menu.map((menu_item) => (
					<li>
					  <h2>
						<strong>{menu_item.food_name}</strong>
					  </h2>
					  <h2>{menu_item.desc}</h2>
					  <h2>
						<strong>Price:</strong> {menu_item.price}
					  </h2>
					  <br />
					</li>
				  ))}
				</ul>
			</div>
			
			<div> 
				<h2 className="text-3xl">Your Reviews</h2>
				<br />
				{this.state.vendor_review_list.length == 0 && (
				  <p>You haven't gotten any reviews.</p>
				  
				)}
				<ul>
				  {this.state.vendor_review_list.map((review) => (
					<li>
					  <br />
					  <h2>
						<strong>
						  {" "}
						  Vendor {review.vendor_name} Rated {review.rating} Stars{" "}
						</strong>
					  </h2>
					  <p>{review.review_content}</p>
					  <br />
					  <hr />
					</li>
				  ))}
				</ul>
				<br />
			  </div>
            <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
			
              <Link href="/">Return to Home</Link>
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}
