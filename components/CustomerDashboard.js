import React from "react";
import Image from 'next/image';
import styles from '../styles/CustomerDashboard.module.css';
import vendors from '../pages/vendors';

export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: "",
      openMap: false,
      buttonSelected: "",
      queryText: ""
    }
    this.handleCuisineSubmit = this.handleCuisineSubmit.bind(this);
    this.handleButtonsSubmit = this.handleButtonsSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleCuisineSubmit() {
    console.log("submitted")
  }

  handleButtonsSubmit() {
    console.log("submitted")
  }

  handleSearchSubmit() {
    console.log("submitted")
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

          <form onSubmit={this.handleButtonSubmit}>
            <button
              className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              type="submit"
            >
              Nearest Me
            </button>

            &emsp;
            &emsp;

            <button
              className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
              type="submit"
            >
              Trending
            </button>

            &emsp;
            &emsp;



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
            <select className={styles.dropdown}>
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

            <input className={styles.textbox} type="test" name="password"
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
                <div className="bg-white border-4 border-solid border-gray-300 rounded-lg h-96"></div>
              </div>

            </div>
          </main>

        </section>
      </div>
    );
  }
};
