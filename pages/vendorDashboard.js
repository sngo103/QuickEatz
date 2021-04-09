import Head from 'next/head'

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Vendor Dashboard Page</h1>
    </div>
  )
}
import Head from 'next/head'


export default function VendorDashboard() {
	return (
		<>
			<Head>
				<title>Vendor Dashboard</title>
					<div class=topnav>
  				<a class=active href=#home>Home</a>
  				<a href=#about>About</a>
  				<a href=#contact>Contact</a>
  				<a href=#help>Help</a>
  				<a href=#dashboard>Dashboard</a>
  				<input type=text placeholder=Search...></input>
		</div>
				
			</Head>

			<h1>QuickEatz</h1>

	<section>
	<header>Vendor Dashboard</header>
	</section>
	<h2> How Can we help you today?</h2>

	<button class=button button1>
	<p1> Edit Profile</p1>
	</button>

	<button class=button button2>
	<p2> Filter </p2>
	</button>
	</>

	)
}
