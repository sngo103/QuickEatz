import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  const cust_email_str = data.email; 
  const cust_email_param = cust_email_str;
  
  const cust_search_param = {"email": cust_email_param };
  
  
  const new_lastname = data.lastname;
  const push_lname_cust = { $set: { last_name: new_lastname } };
 
  
  await db
      .collection("customers")
      .updateOne(cust_search_param, push_lname_cust);
 
}
