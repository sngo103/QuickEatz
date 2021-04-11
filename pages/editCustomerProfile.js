import Head from 'next/head'
import CustomerProfile from '../components/CustomerProfile.js'

export default function editCustomerProfile() {
    return (
        <div>
            <Head>
                <title>editCustomerProfile</title>
            </Head >
            <CustomerProfile />
        </div>
    )
}