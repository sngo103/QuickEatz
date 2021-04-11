import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require('mongodb').ObjectID;


export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;
	
	const customer_lat = parseFloat(data.latitude);
	const customer_lng = parseFloat(data.longitude);
	
	

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
	.limit(20)
    .toArray();
  /*
  const search_param = { "_id": id_param };
  console.log(search_param);
  
  
  const to_update = { $set: {"current_location.coordinates": [parseFloat(data.latitude), parseFloat(data.longitude)]}};
  console.log(to_update);
  
	const response = await db.collection("vendors").updateOne(search_param, to_update);
  
  */
  res.json(nearby_vendors); 
  
}
