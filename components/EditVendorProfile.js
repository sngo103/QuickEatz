import React from "react";
import styles from '../styles/CustomerProfile.module.css'

export default class EditVendorProfile extends React.Component {

    render() {
        return (
            <div>
                <section className={styles.topPage}>
                    <h2 className={styles.title}>Edit Vendor Profile</h2>
                </section>

                <section className={styles.midPage}>
                    <h2> What would you like to edit today?</h2>
                </section >

                <section className={styles.bottomPage}>
                    <br /><br />
                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        Settings
                        </button>

                    &ensp; &ensp;

                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        Apply
                    </button>
                </section>

            </div >
        )
    }
}
