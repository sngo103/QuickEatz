import Head from "next/head";
import Link from "next/link";
import React from "react";
import Router from 'next/router';


export class VendorDisplaySingle extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
		vendor_id: "",
		vendor_name: "Empty",
		vendor_menu: [],
		vendor_cuisine: "Empty",
		vendor_firstname: "",
		vendor_lastname: "",
		vendor_review_ids: [],
		vendor_review_list: [],
		vendor_rating: "",
	};
  }
  
  componentDidMount(){
	  if(this.state.vendor_id == ""){ //This MAY be bad practice, but it works and shouldnt cause any loops, unless you go to the page directly
		const vendor_id = Router.query.vendor_id;
		console.log("VENDOR HEERE");
		console.log(vendor_id);
		console.log(typeof(vendor_id));
		const vendor = fetch(`/api/getVendorSingle?_id=${vendor_id}`) //Get the vendor's data
						.then(data => data.json())
						.then(json => {this.setState({
							vendor_id: json._id,
							vendor_name: json.business_name,
							vendor_menu: json.menu,
							vendor_cuisine: json.cuisine,	
							vendor_firstname: json.first_name,
							vendor_lastname: json.last_name,
							vendor_rating: json.average_rating,
							vendor_review_ids: json.reviews,}),
							console.log("I helped!"),
							console.log(json),
							json.reviews.forEach(r_id => 
											fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
												.then(r_data => r_data.json())
												.then(r_json => {fetch(`/api/getUserName?_id=${r_json.customer_id}`)//Get the username of the reviewer for readability
																	.then(c_data => c_data.json())
																	.then(c_json => {r_json.customer_name = c_json.username,
																					this.setState({vendor_review_list:[...this.state.vendor_review_list, r_json]})
																		}) //Get the name specifically
																
																})
												.catch(error => console.log(error)) //If there is some review that doesn't exist in the table
																	
							)
							
							
							
							
						}); 
	  }
	  
  }
  
  componentDidUpdate(){
	  if(this.state.vendor_id == ""){ //This MAY be bad practice, but it works and shouldnt cause any loops, unless you go to the page directly
		const vendor_id = Router.query.vendor_id;
		console.log("VENDOR HEERE");
		console.log(vendor_id);
		console.log(typeof(vendor_id));
		const vendor = fetch(`/api/getVendorSingle?_id=${vendor_id}`) //Get the vendor's data
						.then(data => data.json())
						.then(json => {this.setState({
							vendor_id: json._id,
							vendor_name: json.business_name,
							vendor_menu: json.menu,
							vendor_cuisine: json.cuisine,	
							vendor_firstname: json.first_name,
							vendor_rating: json.average_rating,
							vendor_lastname: json.last_name,
							vendor_review_ids: json.reviews,}),
							console.log("I helped!"),
							console.log(json),
							json.reviews.forEach(r_id => 
											fetch(`/api/getReviewsVendor?_id=${r_id}`) //Get the reviews (structure of review system seems flawed, works for now)
												.then(r_data => r_data.json())
												.then(r_json => {fetch(`/api/getUserName?_id=${r_json.customer_id}`)//Get the username of the reviewer for readability
																	.then(c_data => c_data.json())
																	.then(c_json => {r_json.customer_name = c_json.username,
																					this.setState({vendor_review_list:[...this.state.vendor_review_list, r_json]})
																		}) //Get the name specifically
																
																})
												.catch(error => console.log(error)) //If there is some review that doesn't exist in the table, but referenced for some reason
																	
							)
							
							
							
							
						}); 
	  }
	  
  }
  render(){
	  console.log("Here's the state!");
	  console.log(this.state);
	  console.log("Here are the reviews!");
	  if(this.state.vendor_review_list.length > 0) {console.log(JSON.stringify(this.state.vendor_review_list[0])); }
	  return (  
	  <>
	  <Head>
        <title>{this.state.vendor_name}</title>
      </Head>
      <body className="text-center">
        <div className="container p-5 text-5xl">
          <h1>{this.state.vendor_name}</h1>
		  {this.state.vendor_rating == -1 ? <h2>Rating pending.</h2> : <h2> Rated {this.state.vendor_rating} out of 5 Stars</h2>}
        </div>

        <h2 className="font-bold">
          Proudly Owned by {this.state.vendor_firstname} {this.state.vendor_lastname}
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
                <h2><strong>Price:</strong> {menu_item.price}</h2>
                <br />
              </li>
            ))}
          </ul>
        </div>
		
		<div>
			<button className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
				onClick={() => 
					Router.push({
						pathname: "/writeReview",
						query: {vendor_id: this.state.vendor_id},
					})
				}> Write a Review! </button>
		</div>
		
        <div>
          <h2 className="text-3xl">Reviews</h2><br />
		  {this.state.vendor_review_list.length == 0 && <p>There are no reviews for this vendor.</p>}
          <ul>
            {this.state.vendor_review_list.map((review) => 
                <li>
					<br />
                  <h2>
                    <strong> User {review.customer_name} Rated {review.rating} Stars </strong>
                  </h2>
                  <p>{review.review_content}</p>
				  <br />
                  <hr />
                </li>
            )}
          </ul>
        </div>
      </body>
	  </> );
	  
  }
}
export default VendorDisplaySingle;
/*<Head>
        <title>{this.state.vendor_name}</title>
      </Head>
      <body className="text-center">
        <div className="container p-5 text-5xl">
          <h1>{this.state.vendor_name}</h1>
        </div>

        <h2 className="font-bold">
          Proudly Owned by {this.state.vendor_firstname} {this.state.vendor_lastname}
        </h2>
        <div className="inline-block container border-8 m-10 border-black w-1/2">
          <br />
          <h2 className="text-3xl">Menu</h2>
          <br />
          
        </div>

        <div>
          <h2 className="text-3xl">Reviews</h2><br />
          
        </div>
      </body>
<ul>
            {this.state.vendor_menu.map((menu_item) => (
              <li>
                <h2>
                  <strong>{menu_item.food_name}</strong>
                </h2>
                <h2>{menu_item.desc}</h2>
                <h2><strong>Price:</strong> {menu_item.price}</h2>
                <br />
              </li>
            ))}
          </ul>
		  
		  <ul>
            {vendor_reviews.map((review) => {
              //let fetch_url = fetch(`http://localhost:3000/api/getUserName?_id=${review.customer_id}`).then(response => (response.json()))
              //																						.then(body => {setReview(current => { rev_name: body.username}, () => console.log(review_item))} )
              //let userdata = ;
              //console.log(review_item);
                <li>
					<br />
                  <h2>
                    <strong> User {review.customer_id} Rated {review.rating} Stars </strong>
                  </h2>
                  <p>{review.review_content}</p>
				  <br />
                  <hr />
                </li>
            })}
          </ul> */