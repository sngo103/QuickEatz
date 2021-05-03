import Head from "next/head";
import React from "react";
import ReactDOM from 'react-dom';
import Router from "next/router";
import Link from 'next/link';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
/*
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
*/
export default class InfoWindowEX extends React.Component {
	constructor(props) {
    super(props);
	
	this.infoWindowRef = React.createRef();
	this.contentElement = document.createElement(`div`);
  }
  
  componentDidUpdate(prevProps){
	  if(this.props.children !== prevProps.children){
		  ReactDOM.render(
			React.Children.only(this.props.children),
			this.contentElement
		  );
		  this.infoWindowRef.current.infowindow.setContent(this.contentElement);
	  }
  }
	
	render(){
		return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
		
	}
}

