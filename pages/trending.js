import Head from "next/head";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";
import Router from "next/router";

export default function Trending({ top_vendors }) {
  //NOTE: I IMPLEMENTED W/O API CALL, CAN MAKE ONE IF STILL NEEDED
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
        <ul>
          {top_vendors.map((vendor) => (
            <li>
              <div>
                <button
                  className="text-xl w-1/6 border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
                  onClick={() =>
                    Router.push({
                      pathname: "/viewVendorSingle",
                      query: { vendor_id: vendor._id },
                    })
                  }
                >
                  {" "}
                  {vendor.business_name}{" "}
                </button>
              </div>
              <h2>{vendor.website}</h2>
              <h3>{vendor.cuisine}</h3>
              {vendor.average_rating == -1 ? (
                <h3>Rating pending</h3>
              ) : (
                <h3> Rated {vendor.average_rating} Stars</h3>
              )}

              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const top_vendors = await db
    .collection("vendors")
    .find({})
    .sort({ average_rating: -1 })
    .limit(25)
    .toArray();
  console.log(top_vendors);
  return {
    props: {
      top_vendors: JSON.parse(JSON.stringify(top_vendors)),
    },
  };
}
