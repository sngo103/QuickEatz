import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { connectToDatabase } from "../util/mongodb";

const ObjectId = require('mongodb').ObjectID;


export default function FirstPost({vendor, vendor_reviews}) {
	//console.log({vendor});
	var username = "";
	
	const getUserName = (user_id) => {
		
		
		const data = fetch(`http://localhost:3000/api/getUserName?_id=${user_id}`);
		
		const res =  data.json();
		
		
		//console.log(res);
		/*let username = res.username;
		return await username;*/
		
		return  res;
	}
	
	
	const [review_item, setReview] = React.useState(null);
	
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
		{
			vendor_reviews.map((review) => {
				
			//let fetch_url = fetch(`http://localhost:3000/api/getUserName?_id=${review.customer_id}`).then(response => (response.json()))
			//																						.then(body => {setReview(current => { rev_name: body.username}, () => console.log(review_item))} )
			//let userdata = ;
			//console.log(review_item);
          return (<li>
            <h2><strong> User {review.customer_id} </strong></h2>
            <p> Rated {review.rating} Stars</p>
            <p>{review.review_content}</p>
			<br />
          </li>)
		  })
		}
      </ul>
 </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
//HARDCODED
  const test_id_str = "60519b709b7aa38721d085f7";
  const test_id = new ObjectId(test_id_str);
  
  const vendor = await db
    .collection("vendors")
    .find({_id: test_id})
    .sort({ average_rating: -1 })
    .limit(1)
    .toArray();
	
  const vendor_reviews = await db
    .collection("reviews")
    .find({vendor_id: test_id})
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