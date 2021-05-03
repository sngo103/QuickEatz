import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  console.log("Data here.");
  console.log(data);
  const vendor_email_str = data.email;
  const vendor_email_param = vendor_email_str;
  
  const vendor_search_param = {"email": vendor_email_param };
  //console.log(search_param);
  
 
  
  
 
  //console.log(to_update);
  //console.log(rating);
  //console.log(typeof(rating));
  
  const response = await db.collection("vendors").findOne(vendor_search_param);

  res.json(response);
}
