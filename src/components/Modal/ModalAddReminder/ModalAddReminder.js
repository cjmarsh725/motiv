import React, { Component } from 'react';
import './ModalAddReminder.css';

class ModalAddReminder extends Component {
  state = {
    content : ""
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  }

  handleConfirm = () => {
    const { content } = this.state;
    this.props.add(content);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({ content: "" });
    this.props.toggle();
  }

  render() {
    return (
      <div className="modaladdreminder">
        <div className="modaladdreminder-title">Enter the content of your reminder:</div>
        <textarea 
            className="modaladdreminder-textarea" 
            onChange={this.handleChange} 
            value={this.state.content}
            ></textarea>
        <div className="modaladdreminder-confirm-btns">
          <div className="modal-btn-primary" onClick={this.handleConfirm}>
            Create
          </div>
          <div className="modal-btn" onClick={this.closeModal}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddReminder;