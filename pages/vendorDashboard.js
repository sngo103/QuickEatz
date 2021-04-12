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
}extra line test
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


			<body>
			<section>

			<div className=toppage>
			<h1>Vendor Dashboard</h1>
			</div>

	
	<div className=midpage>
	<header> Dashboard</header>
	</div>
	</section>

	<div className=heading>
	<h2> How Can we help you today?</h2>
	</div>

	<div className=bottompage>
	<button class=button button1>
	<h3> Edit Profile</h3>
	</button>
	

	<button class=button button2>
	<h4> Filter </h4>
	</button>
	</div>
	</body>

	</>

	)
}
