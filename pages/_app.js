import "../styles/globals.css";
import NavBar from "../components/NavBar.js";
import { Provider } from 'next-auth/client';

function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      </style>
      <NavBar />
      <main>
      <Component />
      </main>
    </Provider>
  );
}

export default App;
