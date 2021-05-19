import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  const id_str = data._id;
  const id_param = new ObjectId(id_str);

  const search_param = { _id: id_param };

  const to_update = {
    $set: {
      "current_location.coordinates": [
        parseFloat(data.latitude),
        parseFloat(data.longitude),
      ],
    },
  };

  const response = await db
    .collection("vendors")
    .updateOne(search_param, to_update);

  res.json(response);
}
