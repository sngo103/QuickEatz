import React from "react";
import NavBar from "../components/NavBar";

function ExtendedNavBar({ pageProps }) {
  return (
    <div className="font-pridi">
      <NavBar {...pageProps} />
    </div>
  );
}

export default ExtendedNavBar;
