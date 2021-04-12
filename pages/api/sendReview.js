import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;

  const user_id_str = data.user_id;
  const user_id_param = new ObjectId(user_id_str);
  
  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);
  
  const user_search_param = { "_id": user_id_param };
  const vendor_search_param = {"_id": vendor_id_param };
  //console.log(search_param);
  
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
  
  const response = await db.collection("reviews").insertOne(insert_review);
  //console.log(response.insertedId);
  
  const push_review_user = {$push: {"reviews": response.insertedId}};
  const response2 = await db.collection("customers").updateOne(user_search_param, push_review_user);
  
  const push_review_vendor = {$push: {"reviews": response.insertedId}};
  const response3 = await db.collection("vendors").updateOne(vendor_search_param, push_review_vendor);
  //console.log(response.insertedId);
  
  res.json(response); 
  
  return response.insertedId;
}
