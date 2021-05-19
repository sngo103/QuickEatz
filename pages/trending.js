import Head from "next/head";
import Image from "next/image";
import { connectToDatabase } from "../util/mongodb";
import Router from "next/router";

export default function Trending({ top_vendors }) {
  let counter = 0;
  return (
    <div className="font-pridi">
      <Head>
        <title>Trending</title>
      </Head>
      <div className="text-center font-bungee bg-gradient-to-r from-red-500 via-yellow-300 to-yellow-500 text-3xl h-16 p-3 text-black font-bold shadow-xl rounded-sm">
        <Image src="/images/fire.gif" width={30} height={30} /> Trending Vendors{" "}
        <Image src="/images/fire.gif" width={30} height={30} />
      </div>
      <div className="container p-5 text-center">
        <br />

        <div className="grid grid-cols-2 gap-4">
          {top_vendors.map((vendor) => {
            counter += 1;
            let suffix = "th";
            if (counter == 1) suffix = "st";
            if (counter == 2) suffix = "nd";
            if (counter == 3) suffix = "rd";
            if (counter > 10) return null;
            return (
              <div className="grid grid-cols-3 shadow-md">
                <div className="font-bungee font-bold bg-gradient-to-r from-yellow-300 to-red-500 col-span-1 rounded-l-2xl text-4xl p-5">
                  <text className="text-7xl">{counter}</text>
                  {suffix}
                </div>
                <div className="col-span-2 rounded-r-2xl p-2 flex justify-center items-center">
                <div className="w-full">
                  <button
                    className="text-xl w-full font-semibold rounded-md p-2 hover:bg-yellow-100 hover:text-black"
                    onClick={() =>
                      Router.push({
                        pathname: "/viewVendorSingle",
                        query: { vendor_id: vendor._id },
                      })
                    }
                  >
                    {" "}
                    {vendor.business_name}
                    {"    "}
                    <div className="float-right">
                      <Image src="/images/right.png" width={30} height={15} />
                    </div>
                  </button>
                  <h2>{vendor.website}</h2>
                  <h3>{vendor.cuisine}</h3>
                  {vendor.average_rating == -1 ? (
                    <h3>Rating pending</h3>
                  ) : (
                    <div className="inline-flex rounded-full bg-yellow-200 text-amber-900 px-2 py-0.5 items-center space-x-1 text-center">
                      <dt className="text-amber-500">
                        <span className="sr-only">Rating</span>
                        <svg width="16" height="20" fill="currentColor">
                          <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                        </svg>
                      </dt>
                      <dd>{vendor.average_rating} Stars</dd>
                    </div>
                  )}
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <hr /><br /> <footer className="text-center">🍔 Made By the QuickEatz Team 🍜</footer><br />
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
  return {
    props: {
      top_vendors: JSON.parse(JSON.stringify(top_vendors)),
    },
  };
}
