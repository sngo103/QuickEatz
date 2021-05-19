import { connectToDatabase } from "./mongodb";
import { ObjectId, Double } from "mongodb";
import { hashSync } from "bcrypt";

export async function findUser(email, coll) {
  const { db } = await connectToDatabase();
  const query = { email: email };
  const searchResult = await db.collection(coll).find(query).toArray();
  return searchResult;
}

// Token == ObjId
export async function checkToken(token) {
  const { db } = await connectToDatabase();
  const obj_id = ObjectId(token);
  const query = {
    _id: obj_id,
  };
  const searchResult = await db.collection("user_sessions").findOne(query);
  return searchResult;
}

export async function addNewToken(email, type) {
  const { db } = await connectToDatabase();
  // Delete session in db if one exists:
  await db.collection("user_sessions").findOneAndDelete({ email: email });
  const sessionDoc = {
    email: email,
    created_at: Date.now(),
    is_deleted: false,
    account_type: type,
  };
  const newToken = await db
    .collection("user_sessions")
    .insertOne(sessionDoc)
    .then((result) => {
      return result.insertedId;
    })
    .catch((err) => console.log("Error:", err));
  return newToken;
}

export async function deleteToken(email) {
  const { db } = await connectToDatabase();
  // Delete session in db if one exists:
  db.collection("user_sessions").findOneAndDelete({ email: email });
  return;
}

export function formatNewCustomer(
  firstName,
  lastName,
  username,
  password,
  email
) {
  const customersDoc = {
    first_name: firstName,
    last_name: lastName,
    username: username,
    password: hashSync(password, 10),
    email: email,
    created_at: Date.now(),
    reviews: [],
    country_code: 1,
  };
  const allUsersDoc = {
    relevant_id: undefined,
    email: email,
    password: hashSync(password, 10),
    account_type: "customer",
  };
  return [customersDoc, allUsersDoc];
}

export function formatNewVendor(userInput) {
  const vendorsDoc = {
    username: userInput.username,
    password: hashSync(userInput.password, 10),
    first_name: userInput.first_name,
    last_name: userInput.last_name,
    email: userInput.email,
    created_at: Date.now(),
    country_code: 1,
    reviews: [],
    business_name: userInput.business_name,
    phone_number: userInput.phone_number,
    website: userInput.website,
    average_rating: Double(-1.0),
    current_location: {
      type: "Point",
      coordinates: [userInput.yCor, userInput.xCor],
    },
    hours: userInput.hours,
    cuisine: userInput.cuisine,
    menu: userInput.menu,
    is_open: false,
  };
  const allUsersDoc = {
    relevant_id: undefined,
    email: userInput.email,
    password: hashSync(userInput.password, 10),
    account_type: "vendor",
  };
  return [vendorsDoc, allUsersDoc];
}
