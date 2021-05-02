import Head from "next/head";
import React from "react";
import WriteReview from "../components/WriteReview";

export default function WriteReviewPage() {
  return (
    <div>
      <Head>
        <title>Create a Review</title>
      </Head>

      <WriteReview />
    </div>
  );
}
