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

    }
  };
  render() {
    return (
      <div>
        <section className="h-50">
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
          {/*
          Nearest Me Trending Best Prices
          Search by {Name, Food}
          */}
          <button
            className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"

          >
            Nearest Me
          </button>
          <button
            className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"
            o
          >
            Trending
          </button>
          <button
            className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white"

          >
            Best Prices
          </button>
          {/*
          <form onSubmit={this.handleSubmit}>
            <button>
              <h className="nearbutton">Nearest Me</h>
              <input
                value={this.state}></input>
            </button>
          </form >
          */}

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
/*
export class CustomerDashboard extends React.Component {
  render() {
    return (
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-6xl font-bungee text-gray-900">Customer Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            //{ Replace with your content }
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
            </div>
            //{ /End replace }
          </div>
        </main>
      </div>
    );
  }
}


export default CustomerDashboard;
*/
