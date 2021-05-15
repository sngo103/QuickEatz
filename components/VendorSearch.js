import React from "react";
import Head from "next/head";
import Router from "next/router";


class VendorSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      cuisine_mode: false,
	  rating_mode: false,
	  alph_mode: true,
	  vendor_results: [],
	  vendor_cuisines: [],
	  cuisine_search: "",
    };
	this.handleChange = this.handleChange.bind(this);
	this.onAlphClick = this.onAlphClick.bind(this);
	this.onRatingClick = this.onRatingClick.bind(this);
	this.onCuisineClick = this.onCuisineClick.bind(this);
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedToken && storedEmail && storedState) {
      const data = {
        token: storedToken,
        email: storedEmail
      };
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
              account_type: json.account_type
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: true,
            });
            Router.push("/login")
          }
        });
    } else {
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: false
      })
      Router.push("/login")
    }
  }
	async onCuisineClick(){
		await fetch(`/api/getVendorsByCuisine?limit=${3}`)
		.then(data => data.json())
		.then(json => {
			//let vendor_list = [],
			/*json.forEach((vendor) => {
				if(vendor_list.includes(vendor.cuisine)){
					//Do nothing, this cuisine's in the list
				}
				else{
					vendor_list.push(vendor.cuisine);
				}
			}),*/
			this.setState(
				{vendor_results: json,
				 rating_mode: false,
				cuisine_mode: true,
				alph_mode: false,
				}
			)
			
			});
	}
	async onRatingClick(){
		await fetch(`/api/getVendorsByRating?limit=${3}`)
		.then(data => data.json())
		.then(json => {this.setState(
			{vendor_results: json,
			rating_mode: true,
			cuisine_mode: false,
			alph_mode: false,
			}
		
		)});
	}
	async onAlphClick(){
		
		await fetch(`/api/getVendorByName?limit=${3}`)
		.then(data => data.json())
		.then(json => {this.setState(
			{vendor_results: json,
			rating_mode: false,
			cuisine_mode: false,
			alph_mode: true,}
		
		)});
	}
	
	handleChange(event) {
    const target = event.target;
    if (target.id === "upd_cuisine") {
      this.setState({ cuisine_search: target.value });
    } 
  }
  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else  {
	  return (
		<>
		<button onClick={this.onAlphClick}> Alphabetical </button> <br />
		<button onClick={this.onRatingClick}> Rating </button> <br />
		<button onClick={this.onCuisineClick}> Cuisine </button>
		{this.state.vendor_results.length == 0 ? <p> No results </p> :
			<>
			{this.state.cuisine_mode == false ? 
			<div> Results:
				
					<ul>
					  {this.state.vendor_results.map((vendor) => (
						<li>
						  <div>
							<button
							  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
							  onClick={() =>
								Router.push({
								  pathname: "/viewVendorSingle",
								  query: { vendor_id: vendor._id },
								})
							  }
							>
							  {" "}
							  {vendor.business_name}{" "}
							</button>
						  </div>
						  <h2>{vendor.website}</h2>
						  <h3>{vendor.cuisine}</h3>
						  {vendor.average_rating == -1 ? (
							<h3>Rating pending</h3>
						  ) : (
							<h3> Rated {vendor.average_rating} Stars</h3>
						  )}

						  <br />
						  <br />
						</li>
					  ))}
					</ul>
				</div>
			:
				<>
				<form>
				  <br />
				  <label className="font-semibold text-xl" for="upd_cuisine">
					Cuisine
				  </label>
				  
				  <input
					type="text"
					id="upd_cuisine"
					placeholder="What Cuisine?"
					value={this.state.cuisine_search}
					onChange={this.handleChange}
					className="text-md w-1/4 border-2 border-black rounded-sm px-1 focus:outline-none"
				  />
				</form>
				<div> Results:
				
					<ul>
					  {this.state.vendor_results.map((vendor) => (<>
						  {this.state.cuisine_search == "" || vendor.cuisine.includes(this.state.cuisine_search) ? 
							<li>
							  <div>
								<button
								  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
								  onClick={() =>
									Router.push({
									  pathname: "/viewVendorSingle",
									  query: { vendor_id: vendor._id },
									})
								  }
								>
								  {" "}
								  {vendor.business_name}{" "}
								</button>
							  </div>
							  <h2>{vendor.website}</h2>
							  <h3>{vendor.cuisine}</h3>
							  {vendor.average_rating == -1 ? (
								<h3>Rating pending</h3>
							  ) : (
								<h3> Rated {vendor.average_rating} Stars</h3>
							  )}

							  <br />
							  <br />
							</li>
						  :
						  
						  null}
						
					  </>))
					  }
					</ul>
				</div>
				</>
			}
			
		</>	
		}
		</>
		);
	}
  }
}

export default VendorSearch;
