import React, { Component } from 'react';
import axios from 'axios';
import RemindersCard from './RemindersCard/RemindersCard';
import Modal from '../Modal/Modal';
import ModalDeleteReminder from '../Modal/ModalDeleteReminder/ModalDeleteReminder';
import ModalAddReminder from '../Modal/ModalAddReminder/ModalAddReminder';
import './Reminders.css';

/*
The Reminders route consists of a series of cards that each have their own reminder.
Modals to add and delete reminders live here along with the functions to support them.
In addition, drag and drop functionality is here to enable the swapping of the
reminders positions.
*/
class Reminders extends Component {
  state = {
    reminders: [],
    isDeleteOpen: false,
    isAddOpen: false,
    deleteIndex: null,
    dragging: null
  }

  // The lifecycle function responsible for populating the initial state if the token is present
  componentDidMount = () => {
    this.getReminders();
  }

  // Retrieves all reminders and sorts them according to their index in state
  getReminders = () => {
    // Retrieve the list of reminders from the backend and extract the content
    axios
      .get(process.env.REACT_APP_BACKEND + '/reminders/', this.getRequestOptions())
      .then(response => {
        this.setState({ reminders: response.data });
      })
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
  }

  // Get a request option object to hold the authorization header for the axios request
  getRequestOptions = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    return requestOptions;
  }

  // Helper functions for the delete and add modals
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }
  toggleAddModal = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }

  // Deletes a reminder at the specified index
  deleteReminder = index => {
    // Change index to id based on reminder data
    const id = index;
    // Send request to delete reminder from a database
    axios
    .post(process.env.REACT_APP_BACKEND + '/reminders/delete', { id }, this.getRequestOptions())
    .then(msg => this.getReminders())
    .catch(err => {
      console.log(err);
      // Redirect to the signin page on error in the assumption that the token was incorrect
      this.props.history.push('/signin');
    });
  }

  // Adds a new reminder with the specified content at the begginning of the content array
  addReminder = content => {
    // Send request to populate database with new reminder
    axios
      .post(process.env.REACT_APP_BACKEND + '/reminders/add', { content }, this.getRequestOptions())
      .then(msg => this.getReminders())
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
  }

  // When a card is dropped on another their positions are swapped in the content array
  onDrop = index => {
    // Change the indices to align with reminder's id
    const movedFrom = this.state.dragging;
    const movedTo = index;
    // Send request to switch reminder indices in the database
    axios
      .post(process.env.REACT_APP_BACKEND + '/reminders/move', { movedFrom, movedTo }, this.getRequestOptions())
      .then(msg => this.getReminders())
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
  }

  render() {
    return (
      <div className="reminders">
        {/* Add button to create a new reminder */}
        <div className="reminders-btn-container">
          <div className="reminders-add-btn" onClick={this.toggleAddModal}>
            <i className="fas fa-plus fa-2x"></i>
          </div>
        </div>
        {/* List of reminder cards */}
        <div className="reminders-container">
          {this.state.reminders.map((reminder, i) => { return (
            <RemindersCard key={"Reminder " + i} 
                            delete={() => this.setState({deleteIndex: reminder.id, isDeleteOpen: true})} 
                            content={reminder.content}
                            index={reminder.id}
                            drag={() => this.setState({dragging: reminder.id})}
                            drop={this.onDrop} />
          )})}
        </div>
        {/* Delete and Add modals for reminders */}
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