import { connectToDatabase } from "../../util/mongodb";
import { findUser } from "../../util/apiHelpers";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  console.log("Data here.");
  console.log(data);
  const vendor_email_str = data.email; //UNNECESSARILY VERBOSE
  const vendor_email_param = vendor_email_str;
  
  const vendor_search_param = {"email": vendor_email_param };
  const new_email = data.newemail;
  
  const vendor = await findUser(new_email, "vendors"); //HIJACKING SAMANTHA's EMAIL CHECK
  //console.log(customer);
    if (vendor.length != 0) { //Is an array
      // If user already exists, return error
	  console.log("This exists!");
      res.status(400).json({ error: "User with this email already exists." });
    } else {
      // If not, update the email
      const new_email = data.newemail;
	  const push_email_vendor = { $set: { email: new_email } };
	 
	  console.log("Updating email...");
	  await db
		  .collection("vendors")
		  .updateOne(vendor_search_param, push_email_vendor);
	  console.log("Email updated!");
	  //MIGHT NOT BE GOOD STYLE TO DO NOTHING WHEN DONE
      res.status(200).json({ message: "New user created." });
    }
  
  


  //res.json(response);
}
