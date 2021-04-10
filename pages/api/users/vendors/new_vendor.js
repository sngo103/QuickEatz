import { connectToDatabase } from "../../../../util/mongodb";
import { formatNewVendor, findUser } from "../../../../util/apiHelpers";
import { body, validationResult } from "express-validator";
import _ from "lodash";

async function addVendor(body) {
  // Format Request Body
  // const userInput = {
  //   username: body.username,
  //   password: body.password,
  //   first_name: body.first_name,
  //   last_name: body.last_name,
  //   email: body.email,
  //   created_at: Date.now(),
  //   country_code: 1,
  //   reviews: [],
  //   business_name: body.business_name,
  //   phone_number: body.phone_number,
  //   website: body.website,
  //   average_rating: -1,
  //   "yCor": body.yCor, 
  //   "xCor": body.xCor,
  //   "open_hours": body.open_hours,
  //   "closed_hours": body.closed_hours,
  //   cuisine: body.cuisine,
  //   menu: body.menu,
  //   is_open: false,
  // };
  // console.log(userInput)
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
    console.log("RECEIVED EMAIL:", req.body.email);
    const vendor = await findUser(_.get(req,'body.email'), "vendors");
    console.log("VENDOR RECEIVED:", vendor);
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
