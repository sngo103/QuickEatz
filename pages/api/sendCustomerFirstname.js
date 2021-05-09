import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  console.log("Data here.");
  console.log(data);
  const cust_email_str = data.email; //UNNECESSARILY VERBOSE
  const cust_email_param = cust_email_str;
  
  const cust_search_param = {"email": cust_email_param };
  
  
  const new_firstname = data.firstname;
  //console.log(search_param);
  const push_fname_cust = { $set: { first_name: new_firstname } };
 
  
  await db
      .collection("customers")
      .updateOne(cust_search_param, push_fname_cust);
 
  //MIGHT NOT BE GOOD STYLE TO DO NOTHING WHEN DONE

  //res.json(response);
}
