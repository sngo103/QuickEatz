import { connectToDatabase } from "../../../../util/mongodb";
import _ from 'lodash';

async function findCustomers(query) {
  const { db } = await connectToDatabase();
  console.log("query:", query);
  const searchResult = await db
    .collection("customers")
    .find(query)
    .toArray();
  console.log("SEARCH:", searchResult);
  return searchResult;
}

// export default async function(req, res) {
//   return new Promise((resolve, reject) => {
//     getData()
//       .then(response => {
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'application/json');
//         res.setHeader('Cache-Control', 'max-age=180000');
//         res.end(JSON.stringify(response))
//         resolve();
//       })
//       .catch(error => {
//         res.json(error);
//         res.status(405).end();
//         return resolve(); //in case something goes wrong in the catch block (as vijay) commented
//       });
//   });
// };

export default async (req, res) => {
  const { db } = await connectToDatabase();
    if(req.method === "POST"){ // If creating a new account...
      // First check if the user already exists:
      console.log("REQUEST BODY:", req.body);
      const customer = await findCustomers(req.body);
      console.log("CUSTOMER:", customer);
      if(!_.isEmpty(customer)){
        res.send(customer);
        res.end();
      } else {
        // If not, create a new user
        res.status(400).json({"message":"You can create a new user."});
      }
    }
};
