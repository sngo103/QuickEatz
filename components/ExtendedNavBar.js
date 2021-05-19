import React from "react";
import NavBar from "../components/NavBar";

function ExtendedNavBar({ pageProps }) {
  return (
    <>
      <NavBar {...pageProps} />
    </>
  );
}

export default ExtendedNavBar;
