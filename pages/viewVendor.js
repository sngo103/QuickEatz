import Head from 'next/head'
import Link from 'next/link'
import { connectToDatabase } from "../util/mongodb";


export default function FirstPost({vendor, vendor_reviews}) {
	//console.log({vendor});
	
  return (
  <>
      <Head>
		<title>{vendor.business_name}</title>
      </Head>
      <h1>{vendor.business_name}</h1>
	  <h2>{vendor.first_name} {vendor.last_name}</h2>
	  <br />
	  <h2>Menu:</h2>
	  <br />
	  <ul>
	  {vendor.menu.map((menu_item) => (
		<li>
			<h2><strong>{menu_item.food_name}</strong></h2>
			<h2>{menu_item.desc}</h2>
			<h2>Price: {menu_item.price}</h2>
			<br />
		</li>
		
	  
	  ))}
	  </ul>
	  <h2>Reviews:</h2>
	  <ul>
        {vendor_reviews.map((review) => (
          <li>
            <h2><strong>User {review.user_id}</strong></h2>
            
            <p>{review.review_content}</p>
          </li>
        ))}
      </ul>
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
	
  const vendor_reviews = await db
    .collection("reviews")
    .find({vendor_id: 123123})
    .sort({ created_at: -1})
    .limit(20)
    .toArray();

	
  return {
    props: {
      vendor: JSON.parse(JSON.stringify(vendor[0])),
	  vendor_reviews: JSON.parse(JSON.stringify(vendor_reviews)),
    },
  };
}