import React, { Component } from 'react';
import axios from 'axios';
import './Signin.css';

class Signin extends Component {
  state = {
    username: "",
    password: "",
    error: false
  }

  redirect = () => {
    this.props.history.push('/signup');
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: false });
  }

  onSubmit = () => {
    const { username, password } = this.state;
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/signin', { username, password })
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