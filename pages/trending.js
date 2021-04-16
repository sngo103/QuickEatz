import Head from "next/head";
import Link from 'next/link';

export default function Trending() {
  return (
    <div>
      <Head>
        <title>Trending</title>
      </Head>
      <div className="container p-5 text-center">
        <h1 className="text-3xl">Trending Hot Spots</h1>
        <br />
        <div className="inline bg-white text-black px-5 py-3 rounded-md text-sm font-medium border-4 hover:border-black w-1/4">
          <Link href="/">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
