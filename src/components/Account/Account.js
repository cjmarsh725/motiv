import React, { Component } from 'react';
import './Account.css'

class Account extends Component {
  getLabels = signedIn => {
    if (signedIn) return ( <>
      <div>Sign out of your account:</div>
      <div>Permanently delete your account:</div>
    </>); else return ( <>
      <div>Sign in to an existing account:</div>
      <div>Sign up for a new account:</div>
    </>);
  }

  getButtons = signedIn => {
    if (signedIn) return ( <>
      <div className="account-btn">Sign Out</div>
      <div className="account-btn">Delete</div>
    </>); else return ( <>
      <div className="account-btn">Sign In</div>
      <div className="account-btn">Sign Up</div>
    </>);
  }

  render() {
    const signedIn = true;
    return (
      <div className="account">
        <div className="account-labels">
          {this.getLabels(signedIn)}
        </div>
        <div className="account-buttons">
          {this.getButtons(signedIn)}
        </div>
      </div>
    );
  }
}

export default Account;