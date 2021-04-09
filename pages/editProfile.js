import Head from 'next/head'

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title>Edit Vendor and Customer Profile</title>
      </Head>
      <h1>Edit Profiles Page</h1>
    </div>
  )
}import Head from 'next/head'


export default function VenderProfile() {
	return (
		<>
			<Head>
				
				<title>Edit Vendor Profile</title>
					<div class=topnav>
  				<a class=active href=#home>Home</a>
  				<a href=#about>About</a>
  				<a href=#contact>Contact</a>
  				<a href=#help>Help</a>
  				<a href=#vendor>Vendor</a>
  				<input type=text placeholder=Search...></input>
		</div>


		<div class=myDiv></div>
				
			</Head>
			<h1>QuickEatz</h1>
			<section>
			<header>Edit Vendor Profile</header>
			</section>



	<h2> What would you like to edit today?</h2>

	<button class=button button1>
	<p1> Settings</p1>
	</button>
	<button class=button button1>
	<p2> Apply </p2>
	</button>

	</>

	)
}
