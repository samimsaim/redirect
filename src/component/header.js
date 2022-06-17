import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { config } from '../config';
import { PublicClientApplication } from "@azure/msal-browser";
import { Component } from "react";

import { Navigate } from 'react-router-dom';
import SignUp from './signup.component'

import './header.css';



class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };

  this.login = this.login.bind(this)

  this.PublicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });
}
async login(){
  try {
    await this.PublicClientApplication.loginPopup(
      {
      scopes:config.scopes,
      prompt: "select_account"
    });
   this.setState({isAuthenticated:true});

  }
  catch(err){
    this.setState({
      isAuthenticated:false,
      user: {},
      error: err
    });
  }

}

logout() {
  this.PublicClientApplication.logout();
}


render(){
  return (
    <div>

{this.state.isAuthenticated ?
     <span>

     <Navigate  to="/sign-up" /></span>:
      <span>
       <input className="test" type="button" value="LogIn" onClick={() => this.login()} /></span> }



</div>
  )
}
}
export default Header;
