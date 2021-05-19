import { connectToDatabase } from "../../../util/mongodb";
import _ from "lodash";

export default async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const query = { username: req.body.username };
    const checkCustomers = await db
      .collection("customers")
      .find(query)
      .toArray();
    const checkVendors = await db.collection("vendors").find(query).toArray();
    if (!_.isEmpty(checkCustomers) || !_.isEmpty(checkVendors)) {
      res.status(400).json({ success: false, error: "Username taken." });
    } else {
      res.status(200).json({ success: true, message: "Username available!" });
    }
  }
};
