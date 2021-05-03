import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectID;

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  console.log("Data Received:");
  console.log(data);
  const user_email = data.user_email;
  const user_email_search_param = { email: user_email };

  const user_data = await db
    .collection("customers")
    .findOne(user_email_search_param);
  console.log(user_data);

  const user_id_str = user_data._id;
  const user_id_param = new ObjectId(user_id_str);

  const vendor_id_str = data.vendor_id;
  const vendor_id_param = new ObjectId(vendor_id_str);

  const user_search_param = { _id: user_id_param };
  const vendor_search_param = { _id: vendor_id_param };
  //console.log(search_param);
  const vendor_data = await db.collection("vendors").findOne(vendor_id_param);

  const rating = parseFloat(data.rating);

  const insert_review = {
    customer_id: user_id_param,
    vendor_id: vendor_id_param,
    rating: rating,
    upvotes: { customers_voted: [], num_upvotes: 0 },
    downvotes: { customers_voted: [], num_downvotes: 0 },
    review_content: data.review_content,
    created_at: Date.now(),
  };

  var i;
  var user_reviews_str = [];
  for (i = 0; i < user_data.reviews.length; i++) {
    user_reviews_str.push(user_data.reviews[i].toString());
  }

  var vendor_reviews_str = [];
  for (i = 0; i < vendor_data.reviews.length; i++) {
    //console.log(i +":" + vendor_data.reviews[i]);
    vendor_reviews_str.push(vendor_data.reviews[i].toString());
  }

  const already_reviewed = user_reviews_str.filter((r_id) =>
    vendor_reviews_str.includes(r_id)
  );

  if (already_reviewed.length > 0) {
    //console.log("This should fail!");
    res.status(400).json({
      error: "The user has already reviewed this vendor.",
      success: false,
    });
  } else {
    const response = await db.collection("reviews").insertOne(insert_review);

    const push_review_user = { $push: { reviews: response.insertedId } };
    await db
      .collection("customers")
      .updateOne(user_search_param, push_review_user);

    const push_review_vendor = { $push: { reviews: response.insertedId } };
    await db
      .collection("vendors")
      .updateOne(vendor_search_param, push_review_vendor);

    res.status(200).json({
      message: "Review Submitted.",
      success: true,
    });
  }
}
