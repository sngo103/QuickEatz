import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  const input_lat = parseFloat(data.latitude);
  const input_lng = parseFloat(data.longitude);

  const nearby_vendors = await db
    .collection("vendors")
    .find({
      current_location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [customer_lat, customer_lng],
          },
          $minDistance: 0,
        },
      },
    })
    .limit(1)
    .toArray();

  res.json(nearby_vendors);
}
