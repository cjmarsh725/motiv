import React, { Component } from 'react';
import './Account.css';
import axios from 'axios';
import Modal from '../Modal/Modal';
import ModalDeleteAccount from '../Modal/ModalDeleteAccount/ModalDeleteAccount';

/*
The Account route contains the functionality for managing accounts and the login process.
There are two main states the page can be in depending on whether or not the user is logged
in. When not logged in the sign in and sign up options appear and when logged in the abilities
to sign out or permanently delete the account are visible.
*/
class Account extends Component {
  state = {
    isDeleteOpen: false
  }

  // Helper function to toggle the delete modal's visibility
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }

  // Permanently deletes an account from the database along with all its associated files
  deleteAccount = () => {
    // Retrieve the token and format it for the authorization header
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    // Send request to delete account from the database
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/delete', {}, requestOptions)
    .then(msg => this.props.history.push('/signup'))
    .catch(err => {
      console.log(err);
      // Redirect to the signin page on error in the assumption that the token was incorrect
      this.props.history.push('/signin');
    });
    // Send request to delete journal file for the user from the database
    axios.post(process.env.REACT_APP_BACKEND + '/files/delete', {}, requestOptions);
    // Send request to delete all appointments for the user from the database
    axios.post(process.env.REACT_APP_BACKEND + '/appointments/deleteall', {}, requestOptions);
    // Send request to delete all reminders for the user from the database
    axios.post(process.env.REACT_APP_BACKEND + '/reminders/deleteall', {}, requestOptions);
  }

  // Helper function to set the labels based on whether the user is signed in or not
  getLabels = signedIn => {
    if (signedIn) return ( <>
      <div>Sign out of your account:</div>
      <div>Permanently delete your account:</div>
    </>); else return ( <>
      <div>Sign in to an existing account:</div>
      <div>Sign up for a new account:</div>
    </>);
  }

  // Helper function to get the buttons based on whether the user is signed in or not
  getButtons = signedIn => {
    if (signedIn) return ( <>
      <div className="account-btn"
          onClick={() => { 
            localStorage.removeItem('token');
            this.forceUpdate();
          }}>
        Sign Out
      </div>
      <div className="account-btn"
          onClick={this.toggleDeleteModal}>
        Delete
      </div>
    </>); else return ( <>
      <div className="account-btn"
          onClick={() => this.props.history.push('/signin')}>
        Sign In
      </div>
      <div className="account-btn"
          onClick={() => this.props.history.push('/signup')}>
        Sign Up
      </div>
    </>);
  }

  render() {
    // Get the token from local storage to determine whether the user is signed in or not
    const signedIn = localStorage.getItem('token');
    return ( <>
      <div className="account">
        <div className="account-labels">
          {this.getLabels(signedIn)}
        </div>
        <div className="account-buttons">
          {this.getButtons(signedIn)}
        </div>
      </div>
      {/* The delete account modal is the confirmation to permanently delete an account */}
      <Modal 
          isOpen={this.state.isDeleteOpen} 
          toggle={this.toggleDeleteModal}>
        <ModalDeleteAccount
            deleteAccount={this.deleteAccount}
            toggle={this.toggleDeleteModal} />
      </Modal>
    </>);
  }
}

export default Account;