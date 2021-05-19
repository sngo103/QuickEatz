import { connectToDatabase } from "../../util/mongodb";

const ObjectId = require('mongodb').ObjectID;

export default async function handler(req, res) {
    const { db } = await connectToDatabase();



    const response = await db.collection("vendors").find().sort({average_rating: -1}).limit(20).toArray();

    res.json(response);

}