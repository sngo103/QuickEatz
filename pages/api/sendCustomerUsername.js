import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  const cust_email_str = data.email; 
  const cust_email_param = cust_email_str;
  
  const cust_search_param = {"email": cust_email_param };
  
  
  const new_uname = data.uname;
  const push_uname_cust = { $set: { username: new_uname } };
 
  
  await db
      .collection("customers")
      .updateOne(cust_search_param, push_uname_cust);
 
  //MIGHT NOT BE GOOD STYLE TO DO NOTHING WHEN DONE

  //res.json(response);
}
