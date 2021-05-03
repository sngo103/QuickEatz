import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;
	
	const customer_lat = parseFloat(data.latitude);
	const customer_lng = parseFloat(data.longitude);
	
	const limiter = parseInt(data.limit);

    const nearby_vendors = await db
    .collection("vendors")
    .find(
	{
		current_location: {
		$nearSphere: {
			$geometry:{
				type: "Point",
				coordinates: [customer_lat, customer_lng]
			},
			$minDistance: 0
			}
		}
	})
	.limit(limiter)
    .toArray();
  res.json(nearby_vendors); 
  
}
