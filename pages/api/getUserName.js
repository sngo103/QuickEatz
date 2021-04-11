import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;

  const user_id_str = data._id;
  const user_id_param = new ObjectId(user_id_str);
  
  const user_search_param = { "_id": user_id_param };
  
  const response = await db.collection("customers").findOne(user_search_param);
  console.log(response);
  
  res.json(response); 
  
  return response;
}
