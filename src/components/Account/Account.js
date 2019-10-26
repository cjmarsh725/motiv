import React, { Component } from 'react';
import './Account.css';
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
    console.log("Delete Account");
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