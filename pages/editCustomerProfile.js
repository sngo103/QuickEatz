import Head from 'next/head'
import EditCustomerProfile from '../components/EditCustomerProfile.js'

export default function editCustomerProfile() {
    return (
        <div>
            <Head>
                <title>Edit Customer Profile</title>
            </Head>
            <EditCustomerProfile />
        </div>
    )
}