import "../styles/globals.css";
import NavBar from "../components/NavBar.js";

function App({ Component, pageProps }) {
  return (
    <div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      </style>
      <NavBar />
      <main>
      <Component {...pageProps} />
      </main>
    </div>
  );
}

export default App;
