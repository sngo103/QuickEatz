import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Vendor Name Here</title>
      </Head>
      <h1>View Vendor Page</h1>
    </Layout>
  )
}import Head from 'next/head'

export default function VendorPage() {
	return (
		<>
			<Head>
				<title>Vendor Page</title>
			
				<div class=topnav>
  				<a class=active href=#home>Home</a>
  				<a href=#about>About</a>
  				<a href=#contact>Contact</a>
  				<a href=#help>Help</a>
  				<a href=#vendor>Vendor</a>
  				<input type=text placeholder=Search...></input>
  			
		</div>
				

			</Head>

			<h1>QUICKEATZ</h1>
	<section>
	<header>View A Vendor</header>
	</section>
	

	<h2> What would you like to do today?</h2>


	<button class=button button1>
	<p1> Read Review</p1>
	</button>
	
	<button class=button button2>
	<p2> Create Review</p2>
	</button>
	</>

	)
}
