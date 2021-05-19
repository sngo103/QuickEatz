import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  //TAKES THE EMAIL AND SEARCHES, NOT ID
  const { db } = await connectToDatabase();

  const data = req.query;

  const vendor_email_str = data.email;
  const vendor_email_param = vendor_email_str;

  const vendor_search_param = { email: vendor_email_param };

  const push_open_vendor = { $set: { is_open: true } };

  await db
    .collection("vendors")
    .updateOne(vendor_search_param, push_open_vendor);
}
