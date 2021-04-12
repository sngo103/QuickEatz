import React from "react";
import Image from 'next/image'
import styles from '../styles/CustomerProfile.module.css'

<<<<<<< HEAD
export default class CustomerProfile extends React.Component {
=======
export class CustomerProfile extends React.Component {
>>>>>>> d109562ea16d63bfef0473af785c13fe3f088ae1

    render() {
        return (
            <div>
                <section className={styles.topPage}>
<<<<<<< HEAD
                    <h1 className={styles.logo}>QuickEatz</h1 >
=======
                    <h1 className={styles.logotext}>QuickEatz</h1 >
                    <br />
                    <br />
>>>>>>> d109562ea16d63bfef0473af785c13fe3f088ae1
                    <header className={styles.title}>Edit Profile</header>
                </section>



                <section className={styles.midPage}>
<<<<<<< HEAD
                    <h2> What would you like to edit today?</h2>
                </section >

                <section className={styles.bottomPage}>

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
=======
                    <h2 className={styles.message}> What would you like to edit today?</h2>
                </section>


                <section className={styles.bottomPage}>
                    <br />
                    <br />
                    <br />
                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        <p1> Settings</p1>
                    </button>

                    &emsp; &emsp; &emsp; &emsp;

                    <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" >
                        <p2> Apply </p2>
                    </button>
                </section>

            </div>
        )
    }
}

export default CustomerProfile;
>>>>>>> d109562ea16d63bfef0473af785c13fe3f088ae1
