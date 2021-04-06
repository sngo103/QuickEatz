import { connectToDatabase } from "../../util/mongodb";



export default async function handler(req, res){
  const { db } = await connectToDatabase();
  
  const data = req.query;

  
  const search_param = { "vendor_id": parseInt(data.vendor_id) };
  console.log(search_param);
  console.log(typeof parseInt(data.vendor_id));
  
  const to_update = { $set: {"current_location.coordinates": [parseFloat(data.latitude), parseFloat(data.longitude)]}};
  console.log(to_update);
  
	const response = await db.collection("vendors").updateOne(search_param, to_update);
  
  
  res.json(response); 
  
}
