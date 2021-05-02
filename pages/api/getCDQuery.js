import { connectToDatabase } from "../../util/mongodb";

const ObjectId = require('mongodb').ObjectID;

export default async function hnadler(req, res) {
    const { db } = await connectToDatabase()
    //const response = await db.collection("vendors").find(user_search_param).limit(10).toArray()
    const response = await db.collection("vendors").find("is_open: false").limit(10).toArray();
    console.log(data);
    res.json(data);
}