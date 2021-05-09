import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  
  const vendor_email_str = data.email; //UNNECESSARILY VERBOSE
  const vendor_email_param = vendor_email_str;
  
  const vendor_search_param = {"email": vendor_email_param };
  
  
  const new_website = data.website;
  //console.log(search_param);
  const push_website_vendor = { $set: { website: new_website } };
 

  await db
      .collection("vendors")
      .updateOne(vendor_search_param, push_website_vendor);
 
  //MIGHT NOT BE GOOD STYLE TO DO NOTHING WHEN DONE

  //res.json(response);
}
