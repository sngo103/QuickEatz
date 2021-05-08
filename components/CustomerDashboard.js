import React from "react";
import styles from "../styles/CustomerDashboard.module.css"
// import Router from 'next/router';
// import { data } from "autoprefixer";

/*
export async function getServerSideProps(context)
{
  const {db} = await connectToDatabase();
  const data = db.collection("vendors").find().sort({_id: 1}).limit(5).toArray();
  const vendors = data.map(vendor => {
      return {
        id: vendor._id,
        name: vendor.business_name,
        cuisine: vendor.cuisine,
        rating: vendor.average_rating
        }
  })
}
      vendors : { 
      }
      */

//found: false,

// queryFlag: 0,
// openMap: false, // get rid of this eventually, will prob have to set up map 
// must set up map to show vendors too perhaps
// userLocation: "0.0, 0.0", // lat long, get form geolocation api ?
// found: false, //dont need this as utils/mongodb does conect establish?
// apiData: []


export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor_id: "",
      vendor_cuisine: "",
      vendor_name: "",
    };
    this.handleNameSearch = this.handleNameSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCuisineSearch = this.handleCuisineSearch.bind(this);
    this.handleCuisineChange = this.handleCuisineChange.bind(this);
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email");
    const storedState = localStorage.getItem("quickeatz");
    if (storedState) {
      const data = {
        token: storedToken,
        email: storedEmail,
      };
      fetch("/api/auth/verifyShallow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
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
              isLoading: false,
            });
          }
        });
    } else {
      console.log("Token not found!");
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
      Router.push("/login")
    if (this.state.cuisine != "") {
      const cuisine = this.state.cuisine;//Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later

      const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`)
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

          <form onSubmit={this.handleCuisineSearch}>
            <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">Search By Cuisine Type:</h>
            &emsp; &emsp;
          <select className={styles.dropdown}
              value={this.state.cuisine}
              onChange={this.handleCuisineChange}
            >
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Halal">Halal</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Spanish">Spanish</option>
              <option value="Greek">Greek</option>
              <option value="Dessert">Dessert</option>
            </select>
            &emsp; &emsp;
          <input className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" type="submit" value="Submit" />
          </form>

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

  componentDidUpdate() {
    if (this.state.cuisine != "") {
      const cuisine = this.state.cuisine; //Router.query.cuisine;
      console.log("Vendor Here");
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later
      // const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get cuisine
      const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get matching cuisine
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine,
          });
        })
        .catch((error) => console.log(error)); //If there is some review that doesn't exist in the table
    } else if (this.state.name != "") {
      const name = this.state.name; //Router.query.name;
      console.log("Vendor Here");
      console.log(name);
      console.log(typeof name);
      // will make it get multiple vendors later
      const vendor = fetch(`/api/getVendorByName?_id=${name}`) // get matching name
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine,
          });
        })
        .catch((error) => console.log(error)); //If there is some review that doesn't exist in the table
    }
  }

  handleCuisineChange = (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({ cuisine: target.value });
  };

  handleCuisineSearch = async (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({ cuisine: target.value });
  };

  handleNameSearch = async (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({ name: target.value });
  };

  handleNameChange = async (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({ name: target.value });
  };
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
          <h className={styles.message}>Search For Vendors Nearby!</h>
          <br />
          <br />
          <h className={styles.secondmessage}>Select Search Criteria</h>
        </section>

        <section className={styles.bottomPage}>
          <br />
          <br />
          <br />

          <button
            className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location = "/trending";
            }}
          >
            Trending
          </button>

          <br />
          <br />
          <br />

          <form onSubmit={this.handleCuisineSearch}>
            <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">
              Search By Cuisine Type:
            </h>
            &emsp; &emsp;
            <select
              className={styles.dropdown}
              value={this.state.cuisine}
              onChange={this.handleCuisineChange}
            >
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Halal">Halal</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Spanish">Spanish</option>
              <option value="Greek">Greek</option>
              <option value="Dessert">Dessert</option>
            </select>
            &emsp; &emsp;
            <input
              className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              type="submit"
              value="Submit"
            />
          </form>

          <br />
          <br />

          <form onSubmit={this.handleNameSubmit}>
            <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">
              Or Search Vendor Truck By Name:
            </h>
            &emsp; &emsp;
            <input
              className={styles.textbox}
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            &emsp; &emsp;
            <input
              className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              type="submit"
              value="Submit"
            />
          </form>

          {this.state.openMap && (
            <div>
              <main>
                <div className="max-w-2xl mx-auto py-20 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white border-4 border-solid border-gray-300 rounded-lg h-96"></div>
                  </div>
                </div>
              </main>
            </div>
          )}

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
}
