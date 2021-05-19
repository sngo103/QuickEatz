import Head from "next/head";
import Dashboard from "../components/Dashboard.js";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="font-pridi">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </div>
  );
}
