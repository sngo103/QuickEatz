import Head from "next/head";
import Link from "next/link";
import React, {Component} from 'react'
import WriteReview from '../components/WriteReview'
import Router from 'next/router';


export default function WriteReviewPage() {
	
  return (
    <div>
	  
      <Head>
        <title>Create a Review</title>
      </Head>
      
      <WriteReview />
    </div>
  )
}




/*
// import { Router } from "express";
import Head from "next/head";
import React from "react";
import Router from 'next/router';
import { connectToDatabase } from "../util/mongodb";

const ObjectId = require("mongodb").ObjectID;

export default function createReview({ current_user, current_vendor }) {
  //console.log({vendor});
  //const sendReview = async (current_user, current_vendor, review_text, review_rating) => {

  //}

  const review_rating = React.useRef(null);
  const review_text = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const rev_info = {
      review_rating: review_rating.current.value,
      review_text: review_text.current.value,
    };

    const user_id_str = current_user._id.toString();
    const vendor_id_str = current_vendor._id.toString();

    const data = fetch(
      `http://localhost:3000/api/sendReview?user_id=${user_id_str}&vendor_id=${vendor_id_str}&review_content=${rev_info.review_text}&rating=${rev_info.review_rating}`
    );

    //console.log(data);
    //const update_user = fetch(`http://localhost:3000/api/updateCustomerReview?user_id=${user_id_str}&rev_id=${data}`);
    //const update_vendor = fetch(`http://localhost:3000/api/updateVendorReview?vendor_id=${vendor_id_str}&rev_id=${data}`);
    //const res =  data.json();
	Router.push("/reviewSubmitted")
  };

  return (
    <>
      <Head>
        <title> Write Review </title>
      </Head>
      <div className="container text-center">
	  <h1 className="container p-3 text-xl">You are writing a review for...</h1>
	  <h1 className="container p-3 text-5xl">{current_vendor.business_name}</h1>
        <br />

        <h1 className="text-xl">
          <strong>Writer:</strong> {current_user.first_name} {current_user.last_name}
        </h1>

        <br />

        <form onSubmit={handleSubmit}>
          <label className="text-xl" for="rating">How would you rate this vendor?</label><br /><br />
          <select className="text-xl border-2 border-black rounded-md p-1" id="rating" ref={review_rating} required>
            <option value="1.0"> 1 Star </option>
            <option value="1.5">1.5 Star </option>
            <option value="2.0"> 2 Star </option>
            <option value="2.5">2.5 Star </option>
            <option value="3.0"> 3 Star </option>
            <option value="3.5">3.5 Star </option>
            <option value="4.0"> 4 Star </option>
            <option value="4.5">4.5 Star </option>
            <option value="5.0"> 5 Star </option>
          </select>
          <br /><br />
		  <hr />
		  <br />
          <label className="text-xl" for="comments">Additional Comments</label>
          <br /><br />
          <textarea
            id="comments"
            placeholder="Leave a comment"
            ref={review_text}
			className="text-md w-1/4 h-32 border-2 border-black rounded-md p-1"
          />
          <br /><br />
		  <hr /><br />
          <button className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white" type="submit">Submit Review</button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  //HARDCODED to Bob NotBob
  const user_id_str = "60492c238b383c2c72b78275";
  const user_id = new ObjectId(user_id_str);

  //HARDCODED to Clarence Burger City
  const vend_id_str = "60519b709b7aa38721d085f7";
  const vend_id = new ObjectId(vend_id_str);

  const current_user = await db
    .collection("customers")
    .find({ _id: user_id })
    .sort({})
    .limit(1)
    .toArray();

  const current_vendor = await db
    .collection("vendors")
    .find({ _id: vend_id })
    .sort({})
    .limit(1)
    .toArray();

  return {
    props: {
      current_vendor: JSON.parse(JSON.stringify(current_vendor[0])),
      current_user: JSON.parse(JSON.stringify(current_user[0])),
    },
  };
} */
