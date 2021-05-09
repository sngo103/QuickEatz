import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
	//console.log("Grabbing a review!");
  const { db } = await connectToDatabase();
  
  const data = req.query;
  
  const vendor_id_str = data._id; //MISLEADING NAME, NEED TO FIX THIS IS REVIEW ID
  const vendor_id_param = new ObjectId(vendor_id_str);
  
  const vendor_search_param = {"_id": vendor_id_param };
	//console.log("Converting the ObjectID");
  //console.log(search_param);
  
  //console.log(to_update);
  //console.log(rating);
  //console.log(typeof(rating));
  
  const response = await db.collection("reviews").findOne(vendor_search_param);
	//console.log("Got a response!");
 // console.log(response);
  res.json(response);
//console.log("Finished!");
}
