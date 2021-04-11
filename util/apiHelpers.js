import { connectToDatabase } from "./mongodb";
import { Double } from 'mongodb';
import { hashSync } from 'bcrypt';

export async function findUser(email, coll) {
  const { db } = await connectToDatabase();
  const query = { email: email };
  const searchResult = await db.collection(coll).find(query).toArray();
  return searchResult;
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
    hours: [
      {
        open: userInput.open_hours,
        close: userInput.closed_hours,
      },
    ],
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