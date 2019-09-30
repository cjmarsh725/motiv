import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
  state = {
    username: "",
    password: ""
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="signin">
        <div className="signin-label-container">
          <div>Username:</div>
          <div>Password:</div>
        </div>
        <div className="signin-input-container">
          <input className="signin-input-username"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange} />
          <input className="signin-input-password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default Signin;