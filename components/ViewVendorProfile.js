import React from "react";
import Head from 'next/head';
import Link from 'next/link';

export default class ViewVendorProfile extends React.Component {

    render() {
        return (
            <div>
            <Head>
              <title>My Profile</title>
            </Head>
            <div className="container p-5 text-center">
              <h1 className="text-3xl">View My Vendor Profile</h1><br />
              <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4"><Link href="/">Return to Home</Link></div>
            </div>
          </div>
        )
    }
}
