import "../styles/globals.css";
import ExtendedNavBar from "../components/ExtendedNavBar.js";
import UserContext from "../components/UserContext";
import App from 'next/app';
import Router from 'next/router';
import React from 'react';

export default class MyApp extends App{
	state = {
		email: "TEST"
	};
	componentDidMount = () => {
		const email = localStorage.getItem('quickeatz_email');
		if(email){
			this.setState({email});
		} else{
			
				Router.push('/'); //TOO ABRUPT MAYBE
		}
		
		
	};
	
	signIn = (email_in) => {
		this.setState({email_in});
	}
	
	signOut = () => {
    this.setState({
      email: null
    });
    Router.push('/');
  };
  render() {
	  const { Component, pageProps } = this.props;
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Pridi:wght@300&display=swap');
        @import
        url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
      </style>
	  <UserContext.Provider value={{email: this.state.user, signIn: this.signIn, signOut: this.signOut}}>
      <ExtendedNavBar />
	  </UserContext.Provider>
      <main>
	
	  <UserContext.Provider value={{email: this.state.user, signIn: this.signIn, signOut: this.signOut}}>
      <Component {...pageProps} />
	  </UserContext.Provider>
	  
      </main>
    </>
  );
  }
}

//export default App;
