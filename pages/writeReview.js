import Head from "next/head";
import React from "react";
import { NewReviewWrapper } from "../components/NewReviewWrapper";
import WriteReview from "../components/WriteReview";

export default function WriteReviewPage() {
  return (
    <div>
      <Head>
        <title>Create a Review</title>
      </Head>
      <WriteReview />
      {/* <NewReviewWrapper /> */}
    </div>
  );
}
