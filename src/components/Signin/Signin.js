import React, { Component } from 'react';
import axios from 'axios';
import './Signin.css';

class Signin extends Component {
  state = {
    username: "",
    password: ""
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = () => {
    axios
    .post(process.env.REACT_APP_BACKEND + '/users/signin', this.state)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/home');
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem('token');
    });
  }

  render() {
    return (
      <div className="signin">
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
                      onChange={this.onChange} />
          </div>
        </div>
        <div className="signin-confirm-btn" onClick={this.onSubmit}>
          Sign In
        </div>
      </div>
    );
  }
}

export default Signin;