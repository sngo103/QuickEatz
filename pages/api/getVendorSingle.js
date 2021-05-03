import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;
  console.log("Data here.");
  console.log(data);
  const vendor_id_str = data._id;
  const vendor_id_param = new ObjectId(vendor_id_str);
  
  const vendor_search_param = {"_id": vendor_id_param };
  //console.log(search_param);
  
 
  
  
 
  //console.log(to_update);
  //console.log(rating);
  //console.log(typeof(rating));
  
  const response = await db.collection("vendors").findOne(vendor_search_param);

  res.json(response);
}
