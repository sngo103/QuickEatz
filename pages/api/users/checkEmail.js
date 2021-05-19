import { connectToDatabase } from "../../../util/mongodb";
import _ from "lodash";

export default async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const query = { email: req.body.email };
    const checkCustomers = await db.collection("customers").find(query).toArray();
    const checkVendors = await db.collection("vendors").find(query).toArray();
    if (!_.isEmpty(checkCustomers) || !_.isEmpty(checkVendors)) {
      res.status(400).json({ success: false, error: "User with this email already exists." });
    } else {
      res.status(200).json({ success: true, message: "User can create a new account!" });
    }
  }
};
