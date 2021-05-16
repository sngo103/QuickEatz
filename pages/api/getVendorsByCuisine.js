import { connectToDatabase } from "../../util/mongodb";

const ObjectId = require('mongodb').ObjectID;

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

 

    const response = await db.collection("vendors").find().sort({cuisine: 1}).toArray();//.limit(10).toArray();
    // no array for testing purposes for now
    //console.log(response);

    res.json(response);

    //return response;
}


/*
export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    //const response = await db.collection("vendors").find(user_search_param).limit(10).toArray();
    //.sort({ _id: 1 })
    const response = await db.collection("vendors").find("is_open: false").limit(5).toArray();

    console.log(response);
    res.json(response);
    return response;
}
*/

/*
export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const data = req.query;
    console.log(data);

    const vendor_id_str = data._id;
    const vendor_id_param = new ObjectId(vendor_id_str);

    const vendor_search_param = { "_id": vendor_id_param };

    const response = await db.collection("vendors").find(vendor_search_param).limit(10).toArray();
    //console.log(response);

    res.json(response);

    //return response;
}
*/