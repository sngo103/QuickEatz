import Head from 'next/head'

export default function FirstPost() {
    return (
        <div>
            <Head>
                <title>Edit Vendor and Customer Profile</title>
            </Head>
            <h1>Edit Profiles Page</h1>
        </div>
    )
}


export default function VenderProfile() {
    return (
        <div>
            <Head>

                <title>Edit Vendor Profile</title>




            </Head >
            <h1>QuickEatz</h1>
            <section>
                <header>Edit Profile</header>
            </section>



            <h2> What would you like to edit today?</h2>

            <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" button1>
                <p1> Settings</p1>
            </button>

            <button className="bg-gray-900 text-white px-5 py-3 rounded-md text-sm font-medium border-4 border-black hover:border-white" button1>
                <p2> Apply </p2>
            </button>

        </div >

    )
}