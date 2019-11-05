import React, { Component } from 'react';
import axios from 'axios';
import './Signin.css';

/*
The Signin component contains the form used to sign in to a user account. There is a link
to the Signup page and input fields for the username and password of an account. Entering
a users details and clicking the button will send a request to the server to validate the
credentials and return a token that is then saved to local storage for use in the other
endpoints.
*/
class Signin extends Component {
  state = {
    username: "",
    password: "",
    error: false
  }

  // Helper function to redirect a user to the signup route
  redirect = () => {
    this.props.history.push('/signup');
  }

  // Updates the username or password and resets the error field to false
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  // When the form is submitted a request is made to the backend to authenticate the credentials
  onSubmit = () => {
    const { username, password } = this.state;
    // Makes a request to the backend for the authorization token
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/signin', { username, password })
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
      <div className="signin">
        <div className="signin-signup-label">
          Sign in to your account below. Don't have an account? <span className="signin-signup-link" onClick={this.redirect}>Sign up here.</span>
        </div>
        <div className="signin-info-container">
          <div className="signin-label-container">
            <div>Username:</div>
            <div>Password:</div>
          </div>
          <div className="signin-input-container">
            <input className="signin-input"
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange} />
            <input className="signin-input"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress} />
          </div>
        </div>
        <div className="signin-confirm-btn" onClick={this.onSubmit}>
          Sign In
        </div>
        {this.state.error ? <div className="signin-error">There was an error signing in with these credentials</div> : null}
      </div>
    );
  }
}

export default Signin;