import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  //IMPLEMENTATION POTENTIALLY SLOW, LOOK INTO LATER
  const { db } = await connectToDatabase();

  const data = req.query;

  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);

  const vendor_search_param = { _id: vendor_id_param };
  const vendor_data = await db.collection("vendors").findOne(vendor_id_param);

  const rating = parseFloat(data.rating);

  //Get the vendor being reviewed
  const vendor_reviewed = await db
    .collection("vendors")
    .findOne(vendor_search_param);


  //Get that vendor's list of review ids
  const review_list = vendor_reviewed.reviews;

  //Find all the reviews that match this list
  const all_vendor_reviews_search = { _id: { $in: review_list } };
  const all_vendor_reviews = await db
    .collection("reviews")
    .find(all_vendor_reviews_search)
    .toArray();

  //Get each of the ratings and find the average
  var sum = 0;
  var i = 0;
  for (i = 0; i < all_vendor_reviews.length; i++) {
    sum += all_vendor_reviews[i].rating;
  }
  var avg = parseFloat((sum / all_vendor_reviews.length).toFixed(2));


  //Update the vendor
  const update_rating = { $set: { average_rating: avg } };
  const response_rating = await db
    .collection("vendors")
    .updateOne(vendor_search_param, update_rating);

  res.status(200).json({
    message: "Review Submitted.",
    success: true,
  });
}
