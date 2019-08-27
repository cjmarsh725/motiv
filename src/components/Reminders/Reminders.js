import React, { Component } from 'react';
import RemindersCard from './RemindersCard/RemindersCard';
import Modal from '../Modal/Modal';
import ModalDeleteReminder from '../Modal/ModalDeleteReminder/ModalDeleteReminder';
import './Reminders.css';

class Reminders extends Component {
  state = {
    reminders: [
      "Schedule dentist appointment",
      "Talk to Joe about Bob",
      "Go to the grocery store and get milk, eggs, cereal, chips, bread, and soda",
      "Sign up for next meetup",
    ],
    isDeleteOpen: false,
    deleteIndex: null
  }

  // Helper function for the delete modal
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }

  deleteReminder = index => {
    const reminders = [...this.state.reminders];
    reminders.splice(index, 1);
    this.setState({ reminders });
  }

  render() {
    return (
      <div className="reminders">
        <div className="reminders-container">
          {this.state.reminders.map((content, i) => { return (
            <RemindersCard key={content + i} 
                            delete={() => this.setState({deleteIndex: i, isDeleteOpen: true})} 
                            content={content} />
          )})}
        </div>
        <Modal isOpen={this.state.isDeleteOpen}
                toggle={this.toggleDeleteModal}>
          <ModalDeleteReminder 
                  delete={() => this.deleteReminder(this.state.deleteIndex)}
                  toggle={this.toggleDeleteModal}/>
        </Modal>
      </div>
    );
  }
}

export default Reminders;