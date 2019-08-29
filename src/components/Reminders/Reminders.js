import React, { Component } from 'react';
import RemindersCard from './RemindersCard/RemindersCard';
import Modal from '../Modal/Modal';
import ModalDeleteReminder from '../Modal/ModalDeleteReminder/ModalDeleteReminder';
import ModalAddReminder from '../Modal/ModalAddReminder/ModalAddReminder';
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
    isAddOpen: false,
    deleteIndex: null
  }

  // Helper functions for the delete and add modals
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }
  toggleAddModal = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }

  deleteReminder = index => {
    const reminders = [...this.state.reminders];
    reminders.splice(index, 1);
    this.setState({ reminders });
  }

  addReminder = content => {
    const reminders = [...this.state.reminders];
    reminders.unshift(content);
    this.setState({ reminders });
  }

  render() {
    return (
      <div className="reminders">
        <div className="reminders-btn-container">
          <div className="reminders-add-btn" onClick={this.toggleAddModal}>
            <i className="fas fa-plus fa-2x"></i>
          </div>
        </div>
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
        <Modal isOpen={this.state.isAddOpen}
                toggle={this.toggleAddModal}>
          <ModalAddReminder 
                  add={this.addReminder}
                  toggle={this.toggleAddModal}/>
        </Modal>
      </div>
    );
  }
}

export default Reminders;