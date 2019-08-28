import React, { Component } from 'react';
import './ModalAddReminder.css';

class ModalAddReminder extends Component {
  state = {
    content : ""
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  }

  render() {
    return (
      <div className="modaladdreminder"></div>
    );
  }
}

export default ModalAddReminder;