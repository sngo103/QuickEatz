import "../styles/globals.css";
import ExtendedNavBar from "../components/ExtendedNavBar.js";
import App from "next/app";
import React from "react";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
          @import
          url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
        </style>

        <main>
          <ExtendedNavBar {...pageProps} />
          <Component {...pageProps} />
        </main>
      </>
    );
  }
}
