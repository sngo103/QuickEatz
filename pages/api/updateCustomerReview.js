import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;

  const user_id_str = data.user_id;
  const user_id_param = new ObjectId(user_id_str);
  
  const rev_id_str = data.rev_id;
  const rev_id_param = new ObjectId(rev_id_str);
  
  
  const user_search_param = { "_id": user_id_param };
  
  const insert_review = {$push: {"reviews": rev_id_param}};
  
  
  const response = await db.collection("customers").updateOne(user_search_param, insert_review);
  console.log(response);
  
  res.json(response); 
  
}
