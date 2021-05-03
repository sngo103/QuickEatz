import Head from "next/head";
import EditVendorProfile from "../components/EditVendorProfile.js";

export default function editVendorProfile() {
  return (
    <div>
      <Head>
        <title>Edit Vendor Profile</title>
      </Head>
      <EditVendorProfile />
    </div>
  );
}
