import { connectToDatabase } from "../../util/mongodb";

/*
table.push(
<tr key={vendor._id}>
    <td> {vendor.business_name} </td>
    <td> {vendor.cuisine} </td>
    <td> {vendor.average_rating} </td>
    <br />
</tr>
*/

const ObjectId = require('mongodb').ObjectID;

// SHOULD TAKE 2 PARMATERS:
// 1. USER LOCATION  2. TYPE: Name or Cuisine Type (For now)

// SORT BY LOC FIRST: User loc - vendor loc <= certain distance


export default async function getCDQuery({ vendors }) {
    return (
        <div>

            {vendors.map((vendor) => (

                <li>
                    <h2> ID: {vendor._id} </h2>
                    <h2> Name: {vendor.business_name} </h2>
                    <h3> Cuisine: {vendor.cuisine} </h3>
                    <h3> Avg Rating: {vendor.average_rating} </h3>
                </li>

            ))
            }
            <br />
        </div >
    );
}

export async function getServerSideProps() { // context
    const { db } = await connectToDatabase();
    //const data = await db.collection("vendors").find({}).sort({ _id: 1 }).limit(5).toArray();
    const vendors = await db.collection("vendors").limit(2).toArray();

    return {
        props: {
            vendors: JSON.parse(JSON.stringify(vendors))
        }
    }
}

/*
   const data = await db.collection("vendors").find({}).limit(2).toArray();
   console.log(data);
   res.json(data);
*/

/*
export default async (req, res) => {
    const { db } = await connectToDatabase();

    const { method } = req;

    switch (method) {
        case ''
    }
}
*/

/**
export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const data = req.query;

    const user_id_str = data._id;
    const user_id_param = new ObjectId(user_id_str);

    const user_search_param = { "_id": user_id_param };

    //const response = await db.collection("vendors").findOne(user_search_param);
    const response = await db.collection("vendors").find(user_search_param).limit(10).toArray();
    console.log(response);

    res.json(response);

    return response;
}
*/
