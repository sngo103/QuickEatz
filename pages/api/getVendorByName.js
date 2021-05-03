import { connectToDatabase } from "../../util/mongodb";

const ObjectId = require('mongodb').ObjectID;

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const data = req.query;
    console.log(data);

    const vendor_name_str = data.business_name;
    const vendor_name_param = new ObjectId(vendor_name_str);

    const vendor_search_param = { "cuisine": vendor_name_param };

    const response = await db.collection("vendors").findOne(vendor_search_param);//.limit(10).toArray();
    // no array for testing purposes for now
    //console.log(response);

    res.json(response);

    //return response;
}