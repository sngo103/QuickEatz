import React from "react";
import styles from "../styles/CustomerDashboard.module.css"
// import Router from 'next/router';
// import { data } from "autoprefixer";


export class VendorDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vendor_id: "",
			vendor_cuisine: "",
			vendor_name: "",
			vendor_location: "", // lat lon
		};
		this.handleNameSearch = this.handleNameSearch.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCuisineSearch = this.handleCuisineSearch.bind(this);
		this.handleCuisineChange = this.handleCuisineChange.bind(this);
	}

	componentDidMount() {
		if (this.state.cuisine != "") {
			const cuisine = this.state.cuisine;//Router.query.cuisine;
			console.log("Vendor Here")
			console.log(cuisine);
			console.log(typeof cuisine);
			// will make to get multiple vendors later

			const vendor = fetch(`/api/getVendorReviews=${cuisine}`)
				// get matching cuisine 
				.then((data) => data.json())
				.then((json => {
					this.setState({
						vendor_id: json._id,
						vendor_name: json.business_name,
						vendor_cuisine: json.cuisine
					})
				}))
				.catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
		}
		else if (this.state.name != "") {
			const name = this.state.name; //Router.query.name;
			console.log("Vendor Here")
			console.log(name);
			console.log(typeof name);
			const vendor = fetch(`/api/getVendorByName?_id=${name}`) // get matching name
				.then((data) => data.json())
				.then((json => {
					this.setState({
						vendor_id: json._id,
						vendor_name: json.business_name,
						vendor_cuisine: json.cuisine
					})
				}))
				.catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
		}
	}

	componentDidUpdate() {
		if (this.state.cuisine != "") {
			const cuisine = this.state.cuisine;//Router.query.cuisine;
			console.log("Vendor Here")
			console.log(cuisine);
			console.log(typeof cuisine);
			// will make to get multiple vendors later
			// const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get cuisine 
			const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get matching cuisine 
				.then((data) => data.json())
				.then((json => {
					this.setState({
						vendor_id: json._id,
						vendor_name: json.business_name,
						vendor_cuisine: json.cuisine
					})
				}))
				.catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
		}
		else if (this.state.name != "") {
			const name = this.state.name; //Router.query.name;
			console.log("Vendor Here")
			console.log(name);
			console.log(typeof name);
			// will make it get multiple vendors later
			const vendor = fetch(`/api/getVendorByName?_id=${name}`) // get matching name
				.then((data) => data.json())
				.then((json => {
					this.setState({
						vendor_id: json._id,
						vendor_name: json.business_name,
						vendor_cuisine: json.cuisine
					})
				}))
				.catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
		}
	}

	handleCuisineChange = (e) => {
		e.preventDefault();
		const target = e.target;
		this.setState({ cuisine: target.value });
	}

	handleCuisineSearch = async (e) => {
		e.preventDefault();
		const target = e.target;
		this.setState({ cuisine: target.value });
	}

	handleNameSearch = async (e) => {
		e.preventDefault();
		const target = e.target;
		this.setState({ name: target.value });
	}

	handleNameChange = async (e) => {
		e.preventDefault();
		const target = e.target;
		this.setState({ name: target.value });
	}
	render() {
		return (
			<div>
				<section className="h-50 bg-mintcream">
					<header className="bg-white shadow text-center">
						<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
							<h1 className={styles.title}>Dashboard</h1>
						</div>
					</header>
				</section>

				<section className={styles.midPage}>
					<h className={styles.message}>
						Search For Vendors Nearby!
        </h>
					<br />
					<br />
					<h className={styles.secondmessage}>
						Select Search Criteria
        </h>
				</section>


				<section className={styles.bottomPage}>

					<br />
					<br />
					<br />

					<button
						className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
						type="button"
						onClick={(e) => {
							e.preventDefault()
							window.location = "/trending";
						}}
					>
						Trending
          </button>

					<br />
					<br />
					<br />

					<br />
					<br />

					<form onSubmit={this.handleNameSubmit}>
						<h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">Or Search Vendor Truck By Name:</h>
						&emsp; &emsp;

          <input className={styles.textbox} type="text"
							value={this.state.name}
							onChange={this.handleNameChange}
						/>

						&emsp; &emsp;
          <input className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" type="submit" value="Submit" />
					</form>


					{
						this.state.openMap && (
							<div>
								<main>
									<div className="max-w-2xl mx-auto py-20 sm:px-6 lg:px-8">

										<div className="px-4 py-6 sm:px-0">
											<div className="bg-white border-4 border-solid border-gray-300 rounded-lg h-96"></div>
										</div>

									</div>
								</main>

							</div>
						)
					}

					<main>
						<div className="max-w-7xl mx-auto py-20 sm:px-6 lg:px-8">

							<div className="px-4 py-6 sm:px-0">
								<div className="bg-white border-4 border-solid border-gray-300 rounded-lg h-96">

									ID: {this.state.vendor_id}
									<br />
									Name: {this.state.vendor_business_name}
									<br />
									Cuisine: {this.state.vendor_cuisine}
									<br />
								</div>
							</div>

						</div>
					</main>

				</section>
			</div>
		);
	}
};