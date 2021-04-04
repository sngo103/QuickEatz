import NavBar from '../components/NavBar.js'

export default function App({ Component, pageProps }) {
  return (
  <div>
  <NavBar />
  <Component {...pageProps} />
  </div>
  )
}