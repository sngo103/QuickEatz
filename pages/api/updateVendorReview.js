import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);

  const rev_id_str = data.rev_id;
  const rev_id_param = new ObjectId(rev_id_str);

  const vendor_search_param = { _id: vendor_id_param };

  const insert_review = { $push: { reviews: rev_id } };

  const response = await db
    .collection("vendors")
    .updateOne(vendor_search_param, insert_review);

  res.json(response);
}
