import React, { Component } from 'react';
import './ModalAddReminder.css';

/*
Interior modal component for adding reminders. Toggled when the add button in the reminders section
is clicked. Takes in a function to add a reminder and the modal toggle function as props.
*/
class ModalAddReminder extends Component {
  state = {
    content : ""
  }

  handleChange = e => {
    this.setState({ content: e.target.value });
  }

  // Uses the add function to create a new modal from state, checks to ensure it is not empty space
  handleConfirm = () => {
    const { content } = this.state;
    if (/\S/.test(content)) this.props.add(content);
    this.closeModal();
  }

  // Resets the content and toggles the modal on close
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
            spellCheck={false}
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