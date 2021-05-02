import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  //IMPLEMENTATION POTENTIALLY SLOW, LOOK INTO LATER
  const { db } = await connectToDatabase();

  const data = req.query;

  console.log("Data Received:");
  console.log(data);

  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);

  const vendor_search_param = { _id: vendor_id_param };
  //console.log(search_param);
  const vendor_data = await db.collection("vendors").findOne(vendor_id_param);

  const rating = parseFloat(data.rating);

  console.log("Vendor found!");
  //Get the vendor being reviewed
  const vendor_reviewed = await db
    .collection("vendors")
    .findOne(vendor_search_param);

  console.log(JSON.parse(JSON.stringify(vendor_reviewed)));

  //Get that vendor's list of review ids
  const review_list = vendor_reviewed.reviews;
  console.log(review_list);

  //Find all the reviews that match this list
  const all_vendor_reviews_search = { _id: { $in: review_list } };
  const all_vendor_reviews = await db
    .collection("reviews")
    .find(all_vendor_reviews_search)
    .toArray();
  console.log("Here are the reviews that match!");
  console.log(JSON.parse(JSON.stringify(all_vendor_reviews)));

  //Get each of the ratings and find the average
  var sum = 0;
  var i = 0;
  for (i = 0; i < all_vendor_reviews.length; i++) {
    sum += all_vendor_reviews[i].rating;
  }
  var avg = parseFloat((sum / all_vendor_reviews.length).toFixed(2));

  console.log("Here's the calculated average!");
  console.log(avg);

  //Update the vendor
  const update_rating = { $set: { average_rating: avg } };
  const response_rating = await db
    .collection("vendors")
    .updateOne(vendor_search_param, update_rating);

  // res.json(response);
  res.status(200).json({
    message: "Review Submitted.",
    success: true,
  });
}
