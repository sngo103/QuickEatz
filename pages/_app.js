import "../styles/globals.css";
import Image from "next/image";
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
      <main>
        <NavBar />
        <Image
          src="/images/quickeatzlogo.png" // Route of the image file
          height={300} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="QuickEatz Logo"
        />
        <h1 className="title">QuickEatz</h1>

        <p className="description">Who's hungry?</p>

        <div className="grid">
          <a href="/login" className="card">
            <h3>Login &rarr;</h3>
            <p>Log into your account here!</p>
          </a>
          <a href="/createAccount" className="card">
            <h3>Create Account &rarr;</h3>
            <p>Want in on the latest food spots? Make an account!</p>
          </a>
          <a href="/vendors" className="card">
            <h3>See Vendors &rarr;</h3>
            <p>Check out vendors nearby!</p>
          </a>
        </div>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default App;
