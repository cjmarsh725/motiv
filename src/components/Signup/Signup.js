import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: false
  }

  redirect = () => {
    this.props.history.push('/signin');
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  onSubmit = () => {
    const { username, password } = this.state;
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/signup', { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    })
    .catch(err => {
      console.log(err);
      this.setState({ error: true });
      localStorage.removeItem('token');
    });
  }

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
        {this.state.error ? <div className="signin-error">There was an error signing in with these credentials</div> : null}
      </div>
    );
  }
}

export default Signup;