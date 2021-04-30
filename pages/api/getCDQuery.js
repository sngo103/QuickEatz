import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;

// SHOULD TKAE 2 PARMATERS:
// 1. USER LOCATION  2. TYPE: Name or Cuisine Type (For now)

// SORT BY LOC FIRST: User loc - vendor loc <= certain distance


export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    /*
    const data = req.query;

    const user_id_str = data._id;
    const user_id_param = new ObjectId(user_id_str);

    const user_search_param = { "_id": user_id_param };

    const response = await db.collection("vendors").findOne(user_search_param);
    console.log(response);

    res.json(response);

    return response;
    */

    const data = await db.collection("vendors").find({}).limit(2).toArray();
    console.log(data);
    res.json(data);
}