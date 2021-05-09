import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  console.log("Data here.");
  console.log(data);
  const cust_email_str = data.email;
  const cust_email_param = cust_email_str;
  
  const cust_search_param = {"email": cust_email_param };
  //console.log(search_param);
  
 
  
  
 
  //console.log(to_update);
  //console.log(rating);
  //console.log(typeof(rating));
  
  const response = await db.collection("customers").findOne(cust_search_param);

  res.json(response);
}
