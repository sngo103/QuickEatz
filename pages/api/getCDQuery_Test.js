import { connectToDatabase } from "../../util/mongodb";

export default async function getCDQuery({ vendors }) {
  return (
    <div>
      {vendors.map((vendor) => (
        <li>
          <h2> ID: {vendor._id} </h2>
          <h2> Name: {vendor.business_name} </h2>
          <h3> Cuisine: {vendor.cuisine} </h3>
          <h3> Avg Rating: {vendor.average_rating} </h3>
        </li>
      ))}
      <br />
    </div>
  );
}

export async function getServerSideProps() {
  // Context
  const { db } = await connectToDatabase();
  const vendors = await db.collection("vendors").limit(2).toArray();

  return {
    props: {
      vendors: JSON.parse(JSON.stringify(vendors)),
    },
  };
}
