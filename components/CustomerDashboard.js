import React from "react";
import styles from "../styles/CustomerDashboard.module.css"
// import api from "./"

export class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: "",
      name: "",
      openMap: false, // get rid of this eventually, will prob have to set up map 
      // must set up map to show vendors too perhaps
      userLocation: "0.0, 0.0", // lat long, get form geolocation api ?
      found: false,
      apiData: []
    };
  }

  componentDidMount() {
    const storedToken = localStorage.getItem("quickeatz_token");
    const storedEmail = localStorage.getItem("quickeatz_email")
    const storedState = localStorage.getItem("quickeatz")
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

  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else if (this.state.isLoggedIn) {
      return (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Customer Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              You are logged in!!!
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Customer Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              Not logged in.
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      );
    }
  }

  /////////////////////////////////
  // 1. Should use getCDQuery API and pass in search params based off o
  // 2. Get results and push into table and format them with css
  // 3. On new search clear table and repeat 1 and 2


  // TESTING IF DATA CAN BE SHOWN ON DAHSBOARD FUNC
  handleTestSearchClick = async () => {
    // clear previous search results: clear table 
    let numberQuery = this.state.number;
    let linkToAPI = 'http://numbersapi.com/' + numberQuery;

    try {
        let response = await axios.get(linkToAPI);
        this.setState({ apiData: response.data, found: true });
        console.log(response.data)
    } catch (error) {
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data); //Not Found
            console.log(error.response.status); //404
            this.setState({ found: false });
        }
    }
}
/////////////////////////////////////////



  handleCusineSearchClick = async () => {
    // clear previous search results: clear table 
    let numberQuery = this.state.number;
    let linkToAPI = 'http://numbersapi.com/' + numberQuery;

    try {
        let response = await axios.get(linkToAPI);
        this.setState({ apiData: response.data, found: true });
        console.log(response.data)
    } catch (error) {
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data); //Not Found
            console.log(error.response.status); //404
            this.setState({ found: false });
        }

    }
}

  handleNameSearchClick = async () => {
    // clear previous search results: clear table 
    let numberQuery = this.state.number;
    let linkToAPI = 'http://numbersapi.com/' + numberQuery;

    try {
      let response = await axios.get(linkToAPI);
      this.setState({ apiData: response.data, found: true });
      console.log(response.data)
    } catch (error) {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data); //Not Found
          console.log(error.response.status); //404
          this.setState({ found: false });
      }

  }
}

  makeVendors = () => { //(apiData, fpund) ? i guess do this if using oth files state
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];
    //found is false when we get 404 error
    if (!foundMatch) {
        table.push(<tr key={-1}><td>No Results</td></tr>);
        return table;
    } else {
        currData.forEach(vendor => {
          let business_name = vendor.business_name;
          let cuisine = vendor.cuisine;
          let average_rating = vendor.average_rating;
          // let first_name = vendor.first_name;
          // let last_name = vendor.last_name;
          table.push(
          <tr>
            <td> {business_name} </td>
            <td> {cuisine} </td>
            <td> {average_rating} </td>
            <br />
          </tr>
          );
        });
      }
    this.setState({found: false }); // IS this needed in order to reset found state 
    // for new query?
    // is it neede to be cleared ? or does new table request making fix it?
    return table;
  }    


/////////////////////////////////

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

            <form onSubmit={this.handleNearestSubmit} className="">
              <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="submit"
              >
                Nearest Me
            </button>
              
            </form>

            <br />

            <form onSubmit={this.handleTrendingSubmit} className="">
              <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="submit"
              >
                Trending
            </button>
              
          </form>

          <br />

            <form onSubmit={this.handlePricesSubmit} className="" >
            
              <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="submit"
              >
                Best Prices
              </button>
            </form>

            <br />
            <br />
            <br />

            <form onSubmit={this.handleCuisineSubmit}>
              <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">Or Search By Cuisine Type:</h>
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
            <br />

            <form onSubmit={this.handleCuisineSubmit}>
              <h className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black ">Or Search Vendor Truck By Name:</h>
              &emsp; &emsp;
  
            <input className={styles.textbox} type="text" 
                value={this.state.queryText}
                onChange={this.handleChange}
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
                      <Head>
		                    <title>{vendor.business_name}</title>
                      </Head>
                      <h1>{vendor.business_name}</h1>
	                    <h2>{vendor.first_name} {vendor.last_name}</h2>
	                    <br />
                    */}
                  </div>
                </div>

              </div>
            </main>

          </section>
        </div>
      );
    }
  };

export default CustomerDashboard;