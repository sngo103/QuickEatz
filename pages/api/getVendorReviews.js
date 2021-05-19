import { connectToDatabase } from "../../util/mongodb";

const ObjectId = require('mongodb').ObjectID;

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const data = req.query;

    const vendor_reviews_str = data.reviews;
    const vendor_reviews_param = new ObjectId(vendor_reviews_str);

    const vendor_search_param = { "cuisine": vendor_reviews_param };

    const response = await db.collection("vendors").findOne(vendor_search_param);//.limit(10).toArray();

    res.json(response);

}