import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css';

/*
The Signup component contains the form used to sign up for a new account. There is a link
to the Signin page and input fields for the username and password of an account. Entering
a users details and clicking the button will send a request to the server to create a new
account with the specified credentials and return a token that is then saved to local
storage for use in the other endpoints.
*/
class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: false
  }

  // Helper function to redirect a user to the signin route
  redirect = () => {
    this.props.history.push('/signin');
  }

  // Updates the username or password and resets the error field to false
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  // When the form is submitted a request is made to the backend to create a new user
  onSubmit = () => {
    const { username, password } = this.state;
    // Makes a request to the backend for a new user and the authorization token
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/signup', { username, password })
    .then(response => {
      // Stores the token in local storage for use in other routes
      localStorage.setItem('token', response.data.token);
      // Redirect to the home page
      this.props.history.push('/');
    })
    .catch(err => {
      console.log(err);
      // Activates the error message and removes any token in local storage
      this.setState({ error: true });
      localStorage.removeItem('token');
    });
  }

  // Helper function to submit the form when enter is pressed in the final field
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  render() {
    return (
      <div className="signup">
        <div className="signup-signin-label">
          Sign up for a new account below. Already have an account? <span className="signup-signin-link" onClick={this.redirect}>Sign in here.</span>
        </div>
        <div className="signup-info-container">
          <div className="signup-label-container">
            <div>Username:</div>
            <div>Password:</div>
          </div>
          <div className="signup-input-container">
            <input className="signup-input"
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange} />
            <input className="signup-input"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress} />
          </div>
        </div>
        <div className="signup-confirm-btn" onClick={this.onSubmit}>
          Sign Up
        </div>
        {this.state.error ? <div className="signup-error">There was an error signing in with these credentials</div> : null}
      </div>
    );
  }
}

export default Signup;