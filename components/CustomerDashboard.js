import React from "react";
import Image from 'next/image'
import styles from '../styles/CustomerDashboard.module.css'

export default class CustomerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: "",
      distance: 0
    }
  };
  render() {
    return (
      <div>
        <section className="h-40">
          <header className="bg-white shadow text-center">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
              <h1 className={styles.title}>Dashboard</h1>
            </div>
          </header>
        </section>

        <section>

          <main>
            <div className="max-w-7xl mx-auto py-20 sm:px-6 lg:px-8">

              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-solid border-gray-300 rounded-lg h-96"></div>
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
