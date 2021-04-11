import { connectToDatabase } from "../../../../util/mongodb";
import { formatNewVendor, findUser } from "../../../../util/apiHelpers";
import { body, validationResult } from "express-validator";
import _ from "lodash";

async function addVendor(body) {
  const reqBodies = formatNewVendor(body);
  const vendorsDoc = reqBodies[0];
  const allUsersDoc = reqBodies[1];

  // Insert new document into 'customers' collection
  const { db } = await connectToDatabase();
  const result = await db.collection("vendors").insertOne(vendorsDoc);
  return result;
}

export default async (req, res) => {
  if (req.method === "POST") {
    // If creating a new account...
    // First check if the user already exists:
    const vendor = await findUser(_.get(req,'body.email'), "vendors");
    if (!_.isEmpty(vendor)) {
      // If user already exists, return error
      res.status(400).json({ error: "User with this email already exists." });
    } else {
      // If not, create a new user
      const result = await addVendor(req.body)
      res.status(200).json({ message: "New user created." });
    }
  }
};
