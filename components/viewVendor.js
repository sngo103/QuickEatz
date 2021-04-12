import Head from 'next/head'

export default function VendorPage() {
	return (
		<>
			<Head>
				<title>Vendor Page</title>
			
				<div className=topnav>
  				<a class=active href=#home>Home</a>
  				<a href=#about>About</a>
  				<a href=#contact>Contact</a>
  				<a href=#help>Help</a>
  				<a href=#trending>Trending</a>
  				<input type=text placeholder=Search...></input>
  			
		</div>
		</Head>
				

			


	<body>		
	<section>

	<div className=toppage>
			<h1>Vendor Page</h1>
			</div>


	<div className=midpage>
	<header>View A Vendor</header>
	</div>
	</section>

	
	<div className=heading>
	<h2> What would you like to do today?</h2>
	</div>

	<div className=bottompage>
	<button class=button button1>
	<h3>Read Review</h3>
	</button>
	
	
	<button class=button button2>
	<h4> Create Review</h4>
	</button>
	</div>
	</body
	</>

	)
}
