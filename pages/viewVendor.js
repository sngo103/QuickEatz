import Head from 'next/head'
import Link from 'next/link'
import { connectToDatabase } from "../util/mongodb";


export default function FirstPost({vendor}) {
	console.log({vendor});
  return (
  <>
      <Head>
		<title>{vendor.business_name}</title>
      </Head>
      <h1>Viewing Vendor Page: {vendor.business_name}</h1>
 </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const vendor = await db
    .collection("vendors")
    .find({vendor_id: 123123})
    .sort({ vendor_id: -1 })
    .limit(1)
    .toArray();
  return {
    props: {
      vendor: JSON.parse(JSON.stringify(vendor[0])),
    },
  };
}