import React from "react";
import Image from 'next/image'
import styles from '../styles/CustomerProfile.module.css'

export default class CustomerProfile extends React.Component {

    render() {
        return (
            <div>
                <section className={styles.topPage}>
                    <h1 className={styles}>QuickEatz</h1 >
                    <header className={styles.title}>Edit Profile</header>
                </section>



                <section className={styles.midPage}>
                    <h2> What would you like to edit today?</h2>

                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        <p1> Settings</p1>
                    </button>

                    &ensp; &ensp;

                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        <p2> Apply </p2>
                    </button>
                </section>

            </div>
        )
    }
}