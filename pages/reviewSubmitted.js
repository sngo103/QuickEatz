import Head from "next/head";
import Link from "next/link";

export default function ReviewSubmittedPage() {
  return (
    <div>
      <Head>
        <title>confirmation</title>
      </Head>
      <div className="container p-5 text-center">
        <h1 className="text-3xl">Thank you, your review has been submitted!</h1>
        <br />
        <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
          <Link href="/dashboard">Return to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
