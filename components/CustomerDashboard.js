import React from "react";
import styles from "../styles/CustomerDashboard.module.css"
import Router from 'next/router';
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
*/

export class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      vendor_id: "",
      vendor_cuisine: "",
      vendor_name: "",
      
      cuisine: "", // search param
      name: "" // search param

      /*
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
    };
    //this.handleNameSearch = this.handleNameSearch.bind(this);
    //this.handleCuisineSearch = this.handleCuisineSearch.bind(this);
  }

  componentDidMount() {
    if(this.state.cuisine != "")
    {
      const cuisine = Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later
      // const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get cuisine 
      fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get matching cuisine 
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
    }
    else if(this.state.name != "")
    {
      const name = Router.query.name;
      console.log("Vendor Here")
      console.log(name);
      console.log(typeof name);
      // will make it get multiple vendors later
      fetch(`/api/getVendorByName?_id=${name}`) // get matching name
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
    }
  }

  componentDidUpdate() {
    if(this.state.cuisine != "")
    {
      const cuisine = Router.query.cuisine;
      console.log("Vendor Here")
      console.log(cuisine);
      console.log(typeof cuisine);
      // will make to get multiple vendors later
      // const vendor = fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get cuisine 
      fetch(`/api/getVendorsByCuisine?_id=${cuisine}`) // get matching cuisine 
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
    }
    else if(this.state.name != "")
    {
      const name = Router.query.name;
      console.log("Vendor Here")
      console.log(name);
      console.log(typeof name);
      // will make it get multiple vendors later
      fetch(`/api/getVendorByName?_id=${name}`) // get matching name
        .then((data) => data.json())
        .then((json => {
          this.setState({
            vendor_id: json._id,
            vendor_name: json.business_name,
            vendor_cuisine: json.cuisine
          })
        }))
    }
  }

  /*
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
  */
  
  /*
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
              */
              /* /End replace */
              /*
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
              /* /End replace */
              /*
            </div>
          </main>
        </div>
      );
    }
  }
*/
  
  /////////////////////////////////
  // 1. Should use getCDQuery API and pass in search params based off o
  // 2. Get results and push into table and format them with css
  // 3. On new search clear table and repeat 1 and 2


  // TESTING IF DATA CAN BE SHOWN ON DAHSBOARD FUNC
  handleTestSearch = async () => {
    /*
    // clear previous search results: clear table 
    let numberQuery = this.state.number;
    let linkToAPI = 'http://numbersapi.com/' + numberQuery;

    try {
        let response = await axios.get(linkToAPI);
        this.setState({ apiData: response.data, found: true });
        console.log(response.data)
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); //Not Found
            console.log(error.response.status); //404
            this.setState({ found: false });
        }
    }
    */
   this.setState("cusine: cuisine");
}
/////////////////////////////////////////


  handleCuisineChange = (e) => {
    e.preventDefault();
    const target = e.target;
    this.setState({cuisine: target.value});
  }


  handleCusineSearch = async () => {
    
  }

  handleNameSearch = async () => {
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

  // Can be used later insetad to print all vendors from data retreived perhaps
  /*
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
          let id = vendor._id; 
          let business_name = vendor.business_name;
          let cuisine = vendor.cuisine;
          let average_rating = vendor.average_rating;
          // let first_name = vendor.first_name;
          // let last_name = vendor.last_name;
            table.push(
            <tr key={id}>
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
  */
  //getStaticProps()



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
            <br />
           
            <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  window.location="/trending";
                }}
              >
                Trending
            </button>      
                           
            <br/>
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
                    
                    { this.props.vendors }

                    {/*vendors.map(vendor => {
                    <li>{vendor.business_name}</li>
                    })*/}
                    
                    
                  </div>
                </div>

              </div>
            </main>

          </section>
        </div>
      );
    }
  
    /*
    componentDidMount() {
      if(this.state._id == "")
      {
        const _id = Router.query._id;
        console.log("Vendor Here")
        console.log(_id);
        console.log(typeof _id);
        // will make to get multiple vendors later
        const vendor = fetch(`/api/getCDQuery?_id=${_id}`) // get Vendor id
          .then((data) => data.json())
          .then((json => {
            this.setState({
              _id: json._id,
              name: json.business_name,
              cuisine: json.cuisine
            })
          }))
      }
    }
    */
};

export default CustomerDashboard;

/*
export async function componentDidMount(props) {
    componentDidMount() {

      let flag = props.queryFlag; 
      let params = {
        cuisine: "",
        name: "",
        flag: 0
      }

      // move the switch statemnt to getCDQuery later?
      switch(flag)
      {
        case 0 : // 0 = cusisne search
          params = {
            cusine: props.cusine,
            name: "",
            queryFlag: props.queryFlag
          }
          break;

        case 1: // 1 = name search
          params = {
            cusine: "",
            name: props.name,
            queryFlag: props.queryFlag
          }
          break;
      }  
        
    
      fetch("/api/getCDQuery", {
        method: "GET",
        // headers: {
        //  "Content-Type": "application/json",
        // },
        // body: JSON.stringify(data),
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
            
           //data = await res.json();
           return {
            props: { data }
          }
         } else {
           this.setState({
             isLoggedIn: false,
             isLoading: false,
           });
         }
       });
    
   /*else {
     console.log("Token not found!")
     this.setState({
       isLoggedIn: false,
       isLoading: true,
     });
   }
   vendors = ""; // for now
   return vendors;
 }
*/

// Nearest Me front end
/*
<form onSubmit={this.handleNearestSubmit} className="">
              <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="submit"
              >
                Nearest Me
            </button>
              
</form>
*/

// Best Proces Front End
/*
<form onSubmit={this.handlePricesSubmit} className="" >
            
              <button
                className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
                type="submit"
              >
                Best Prices
              </button>
</form>
*/

// const geocod = fetch(`/api/revGeoCode?_id=${_id}`) //try to get geocode later