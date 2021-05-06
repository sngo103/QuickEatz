import React from "react";
import styles from "../styles/CustomerDashboard.module.css"
// import Router from 'next/router';

/*
// Not an efficent way to get all ids, names, and cuisines to print them as making more arrays but will do for now 
function ListVendors(props) {
  // Build an array of items
  let id_array = [];
  let name_array = [];
  let cuisine_array = [];
  for (let i = 0; i < props.vendor_amount; i++) {
    id_array.push(
      <Item key={i} item={props.vendor_ids[i]} />
    );
    name_array.push(
      <Item key={i} item={props.vendor_names[i]} />
    );
    cuisine_array.push(
      <Item key={i} item={props.cuisine_names[i]} />
    );
  }
}
*/

// Not an efficent way to get all ids, names, and cuisines to print them as making more arrays but will do for now 
function ListVendors(props) {
  return (
    <div>
      {props.vendor_ids.map((vendor_id, index) => (
        <Item key={index} item={vendor_id} />
      ))}
      {props.vendor_names.map((vendor_name, index) => (
        <Item key={index} item={vendor_name} />
      ))}
      {props.vendor_cuisines.map((vendor_cuisine, index) => (
        <Item key={index} item={vendor_cuisine} />
      ))}
    </div>
  );
}


export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      vendor_ids: [],
      vendor_cuisines: [],
      vendor_names: [],
      vendor_locations: [],
      vendor_amount = 0, // amount of vendors used which will be used for above three arrays
      cuisine: "", // search param
      name: "" // search param
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
        email: storedEmail
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
            console.log("Token verified!")
            localStorage.setItem("quickeatz_token", json.newToken)
            localStorage.setItem("quickeatz", true)
            this.setState({
              isLoggedIn: true,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoggedIn: false,
              isLoading: false,
            });
          }
        });
    } else {
      console.log("Token not found!")
      this.setState({
        isLoggedIn: false,
        isLoading: true,
      });
    }
  }

  componentDidUpdate() {
    // clean state arrays 
    this.setState(
      { vendor_amount: 0 },
      { vendor_ids: [] },
      { vendor_cuisines: [] },
      { vendor_names: [] },
      { vendor_locations: [] }
    )
    if (this.state.cuisine != "") {
      const cuisine = this.state.cuisine;//Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      let _ids = [...this.state.vendor_ids];
      let vendor_names_ = [...this.state.vendor_names];
      let cuisines_ = [...this.state.vendor_cuisines];
      // will make to get multiple vendors later
      // const vendor = fetch(`/api/getVendorsByCuisine?_id=${vendor_id}`) // get cuisine 
      const vendor = await fetch(`/api/getVendorsByCuisine?cuisine=${cuisine}`) // get matching cuisine 
        .then((data) => data.json())
        .then((json => {
          _ids.push(json._id); //need to push value: json._id?
          vendor_names.push(json.business_name);
          cuisines_.push(vendor_cuisines);
          this.setState({
            vendor_ids: _ids,
            vendor_cuisines: cuisines_,
            vendor_names: vendor_names_,
            vendor_amount = (prevState) => {
              this.setState({ vendor_amount: prevState.vendor_amount + 1 })
            }
          })
          console.log(json);
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }

    else if (this.state.name != "") {
      const name = this.state.name; //Router.query.name;
      console.log("Vendor Here")
      console.log(name);
      console.log(typeof name);
      let _ids = [...this.state.vendor_ids];
      let vendor_names_ = [...this.state.vendor_names];
      let cuisines_ = [...this.state.vendor_cuisines];
      // will make it get multiple vendors later
      const vendor = await fetch(`/api/getVendorByName?business_name=${name}`) // get matching name
        .then((data) => data.json())
        .then((json => {
          _ids.push(json._id); //need to push value: json._id?
          vendor_names.push(json.business_name);
          cuisines_.push(vendor_cuisines);
          this.setState({
            vendor_ids: _ids,
            vendor_cuisines: cuisines_,
            vendor_names: vendor_names_,
            vendor_amount = (prevState) => {
              this.setState({ vendor_amount: prevState.vendor_amount + 1 })
            }
          })
          console.log(json);
        }))
        .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
    }
  }

  //handleCuisineChange = async (e) => {
  handleCuisineChange = async (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({ cuisine: target.value });
  }

  handleCuisineSearch = async (e) => {
    e.preventDefault();
    // clean state arrays 
    // clean state arrays 
    this.setState(
      { vendor_amount: 0 },
      { vendor_ids: [] },
      { vendor_cuisines: [] },
      { vendor_names: [] },
      { vendor_locations: [] }
    );
    const target = e.target;
    this.setState({ cuisine: target.value });

    let _ids = [...this.state.vendor_ids];
    let vendor_names_ = [...this.state.vendor_names];
    let cuisines_ = [...this.state.vendor_cuisines];
    // Make array results
    await fetch(`/api/getVendorsByCuisine?cuisine=${this.state.cuisine}`) // get matching cuisine 
      .then((data) => data.json())
      .then((json => {
        _ids.push(json._id); //need to push value: json._id?
        vendor_names.push(json.business_name);
        cuisines_.push(vendor_cuisines);
        this.setState({
          vendor_ids: _ids,
          vendor_cuisines: cuisines_,
          vendor_names: vendor_names_,
          vendor_amount = (prevState) => {
            this.setState({ vendor_amount: prevState.vendor_amount + 1 })
          }
        })
      }))
      .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
  }


  handleNameSearch = async (e) => {
    e.preventDefault();
    // clean state arrays 
    this.setState(
      { vendor_amount: 0 },
      { vendor_ids: [] },
      { vendor_cuisines: [] },
      { vendor_names: [] },
      { vendor_locations: [] }
    );
    const target = e.target;
    this.setState({ name: target.value });

    let _ids = [...this.state.vendor_ids];
    let vendor_names_ = [...this.state.vendor_names];
    let cuisines_ = [...this.state.vendor_cuisines];
    await fetch(`/api/getVendorsByCuisine?business_name=${this.state.name}`) // get matching business name
      .then((data) => data.json())
      .then((json => {
        _ids.push(json._id); //need to push value: json._id?
        vendor_names.push(json.business_name);
        cuisines_.push(vendor_cuisines);
        this.setState({
          vendor_ids: _ids,
          vendor_cuisines: cuisines_,
          vendor_names: vendor_names_,
          vendor_amount = (prevState) => {
            this.setState({ vendor_amount: prevState.vendor_amount + 1 })
          }
        })
      }))
      .catch((error) => console.log(error)) //If there is some review that doesn't exist in the table
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

                  {/* 
                    ID: {this.state.vendor_id}
                    <br />
                    Name: {this.state.vendor_business_name}
                    <br />
                    Cuisine: {this.state.vendor_cuisine}
                    <br />
                    */}

                  {/*


                      { this.state.vendor_ids[0] }
                      < br />
                      { this.state.vendor_cuisines[0] }
                      < br />
                      { this.state.vendor_names[0] }
                      < br />
                      <br />

                    */}

                </div>
              </div>

            </div>
          </main>

        </section>
      </div >
    );
  }


}
