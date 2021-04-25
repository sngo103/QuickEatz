import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;
  
  console.log("Data Received:");
  console.log(data);
  const user_email = data.user_email;
  const user_email_search_param = {"email": user_email};
  
  const user_data = await db.collection("customers").findOne(user_email_search_param);
  console.log(user_data);
  

  const user_id_str = user_data._id;
  const user_id_param = new ObjectId(user_id_str);
  
  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);
  
  const user_search_param = { "_id": user_id_param };
  const vendor_search_param = {"_id": vendor_id_param };
  //console.log(search_param);
  const vendor_data = await db.collection("vendors").findOne(vendor_id_param);
  
  const rating = parseFloat(data.rating);
  
  
  const insert_review = { "customer_id": user_id_param,
							"vendor_id": vendor_id_param, 
							"rating": rating, 
							"upvotes": {"customers_voted": [], "num_upvotes": 0},
							"downvotes": {"customers_voted": [], "num_downvotes": 0},
							"review_content": data.review_content,
							"created_at": Date.now(),
							};
  //console.log(to_update);
  //console.log(rating);
  //console.log(typeof(rating));
  
  //console.log(already_reviewed);
 
 // console.log(typeof(user_data.reviews[0]));
  //console.log(user_data.reviews[7].toString() == vendor_data.reviews[4].toString());

  
  var i;
  var user_reviews_str = [];
  for(i = 0; i < user_data.reviews.length; i++){
	  //console.log(i +":" + user_data.reviews[i]);
	  user_reviews_str.push(user_data.reviews[i].toString());
  }
 /*for(review in user_data.reviews){
	  console.log(review);
	  user_reviews_str.push(review.toString());
  } */
  //console.log(user_reviews_str);
  
  var vendor_reviews_str = [];
  for(i = 0; i < vendor_data.reviews.length; i++){
	  //console.log(i +":" + vendor_data.reviews[i]);
	  vendor_reviews_str.push(vendor_data.reviews[i].toString());
  }
  /*for(review in vendor_data.reviews){
	  
	  vendor_reviews_str.push(review.toString());
  }*/
 // console.log(vendor_reviews_str);
  
  
  const already_reviewed = user_reviews_str.filter(r_id => vendor_reviews_str.includes(r_id));
  //console.log(already_reviewed);
  
  if(already_reviewed.length > 0){
	  //console.log("This should fail!");
	  res.status(400).json({
      error: "The user has already reviewed this vendor.",
      success: false,
    });
  }
  else{
	  const response = await db.collection("reviews").insertOne(insert_review);
	  //console.log(vendor_id_str);
	 // console.log(vendor_id_param);
	 // console.log(JSON.stringify(vendor_search_param));
	  //console.log(typeof(response.insertedId));
	  //console.log(response.json());
	  
	  const push_review_user = {$push: {"reviews": response.insertedId}};
	  const response2 = await db.collection("customers").updateOne(user_search_param, push_review_user);
	  //console.log(response2.json());
	  
	  const push_review_vendor = {$push: {"reviews": response.insertedId}};
	  const response3 = await db.collection("vendors").updateOne(vendor_search_param, push_review_vendor);
	  //console.log(response.insertedId);
	  
	  /*
	  //Get the vendor being reviewed
	  const vendor_reviewed = await db.collection("vendors").findOne(vendor_search_param);
	  
	  //Get that vendor's list of review ids
	  const review_list = vendor_reviewed.reviews;
	  
	  //Find all the reviews that match this list
	  //const all_vendor_reviews_search = {"_id": {$in: review_list}};
	  
	  //Average all of the ratings
	  const avg = [{$match: {"_id": {$in: review_list}}}, {$group: {"_id": "_id", average: {$avg: "$rating"}}}];
	  const all_vendor_reviews = await db.collection("reviews").aggregate(avg);
	  
	  console.log(all_vendor_reviews);
	  //Store this
	  const new_rating = all_vendor_reviews.average;
	  
	  //Update the vendor
	  const update_rating = {"average_rating": new_rating};
	  const response_rating = await db.collection("vendors").updateOne(vendor_search_param, update_rating);
	  */
	  //console.log(response3.json());
	  
	  
	 // res.json(response); 
	  res.status(200).json({
      message: "Review Submitted.",
      success: true,
    });
	  //return response.insertedId;
  }
  
}
