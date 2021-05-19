import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection("vendors").find().limit(5).toArray();
  res.json(data);
  return response;
}
