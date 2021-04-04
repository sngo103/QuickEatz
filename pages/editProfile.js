import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Router from "next/router";

export default function FirstPost() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      Router.push("/");
    }
  });

  return (
    <div>
      <Head>
        <title>Edit Vendor and Customer Profile</title>
      </Head>
      <h1>Edit Profiles Page</h1>
    </div>
  );
}
