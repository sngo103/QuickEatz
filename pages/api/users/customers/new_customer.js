import { connectToDatabase } from "../../../../util/mongodb";
import { formatNewCustomer, findUser } from "../../../../util/apiHelpers";
import { body, validationResult } from "express-validator";
import _ from "lodash";

async function addCustomer(body) {
  // Format Request Body
  const reqBodies = formatNewCustomer(
    body.first_name,
    body.last_name,
    body.username,
    body.password,
    body.email
  );
  const customersDoc = reqBodies[0];
  const allUsersDoc = reqBodies[1];

  // Insert new document into 'customers' collection
  const { db } = await connectToDatabase();
  const result = await db.collection("customers").insertOne(customersDoc);
  return result;
}

export default async (req, res) => {
  if (req.method === "POST") {
    // If creating a new account...
    // First check if the user already exists:
    const customer = await findUser(_.get(req, "body.email"), "customers");
    if (!_.isEmpty(customer)) {
      // If user already exists, return error
      res.status(400).json({
        success: false,
        error: "User with this email already exists.",
      });
    } else {
      // If not, create a new user
      const result = await addCustomer(req.body).then();
      res.status(200).json({
        success: true,
        message: "New user created.",
      });
    }
  }
};
