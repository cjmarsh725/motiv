import React, { Component } from 'react';
import './Account.css';
import axios from 'axios';
import Modal from '../Modal/Modal';
import ModalDeleteAccount from '../Modal/ModalDeleteAccount/ModalDeleteAccount';

class Account extends Component {
  state = {
    isDeleteOpen: false
  }

  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }

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