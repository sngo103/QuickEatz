import Head from "next/head";
import Dashboard from "../components/Dashboard.js";
import React from "react";

export default function DashboardPage({ initProps }) {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </div>
  );
}
