import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {
  state = {
    username: "",
    password: ""
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="signup">
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
                      onChange={this.onChange} />
          </div>
        </div>
        <div className="signup-confirm-btn">
          Sign Up
        </div>
      </div>
    );
  }
}

export default Signup;