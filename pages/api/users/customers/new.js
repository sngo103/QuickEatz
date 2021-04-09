import { connectToDatabase } from "../../../../util/mongodb";
import { formatNewCustomer } from "../../../../util/apiHelpers";
import { body, validationResult } from "express-validator";
import _ from "lodash";

async function findCustomer(email) {
  const { db } = await connectToDatabase();
  const query = {"email": email}
  const searchResult = await db.collection("customers").find(query).toArray();
  console.log("SEARCH:", searchResult);
  return searchResult;
}

async function addUser(body) {
  // Format Request Body
  const reqBodies = formatNewCustomer(body.first_name, body.last_name, body.username, body.password, body.email);
  const customersDoc = reqBodies[0];
  const allUsersDoc = reqBodies[1];
  console.log("customers:", customersDoc);
  console.log("allUsers", allUsersDoc);
  // Insert new document into 'customers' collection
  const { db } = await connectToDatabase();
  const result = await db.collection("customers").insertOne(customersDoc);
  console.log("Result:", result);
  return result;
}

export default async (req, res) => {
  if (req.method === "POST") {
    // If creating a new account...
    // First check if the user already exists:
    console.log("REQUEST BODY:", req.body);
    const customer = await findCustomer(_.get(req,'body.email'));
    console.log("CUSTOMER:", customer);
    if (!_.isEmpty(customer)) {
      // If user already exists, return error
      res.status(400).json({ error: "User already exists." });
    } else {
      // If not, create a new user
      const result = await addUser(req.body)
      res.status(200).json({ message: "You can create a new user." });
    }
  }
};
