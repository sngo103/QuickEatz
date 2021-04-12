import "../styles/globals.css";
import ExtendedNavBar from "../components/ExtendedNavBar.js";

function App({ Component, pageProps }) {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      </style>
      <ExtendedNavBar />
      <main>
      <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
