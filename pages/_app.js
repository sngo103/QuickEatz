import "../styles/globals.css";
import NavBar from "../components/NavBar.js";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      </style>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
