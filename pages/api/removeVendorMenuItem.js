import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){ //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();
  
  const data = req.query;
  
  const vendor_email_str = data.email; 
  const vendor_email_param = vendor_email_str;
  
  const vendor_search_param = {"email": vendor_email_param };
  
  
  const old_menuitem = {
	  food_name: data.food_name,
	  desc: data.desc,
	  price: parseFloat(data.price),};

    const pull_menuitem_vendor = { $pull: { menu: old_menuitem } };
 
  await db
      .collection("vendors")
      .updateOne(vendor_search_param, pull_menuitem_vendor);
}
