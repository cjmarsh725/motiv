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
    reminders: [
      "Schedule dentist appointment",
      "Talk to Joe about Bob",
      "Go to the grocery store and get milk, eggs, cereal, chips, bread, and soda",
      "Sign up for next meetup",
    ],
    isDeleteOpen: false,
    isAddOpen: false,
    deleteIndex: null,
    dragging: null
  }

  // The lifecycle function responsible for populating the initial state if the token is present
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    // Set a request option object to hold the authorization header for the axios request
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };
    // Retrieve the list of reminders from the backend and extract the content
    axios
      .get(process.env.REACT_APP_BACKEND + '/reminders/', requestOptions)
      .then(response => {
        this.setState({ reminders: response.data.map(r => r.content) });
      })
      .catch(err => {
        console.log(err);
        // Redirect to the signin page on error in the assumption that the token was incorrect
        this.props.history.push('/signin');
      });
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
    const reminders = [...this.state.reminders];
    reminders.splice(index, 1);
    this.setState({ reminders });
  }

  // Adds a new reminder with the specified content at the begginning of the content array
  addReminder = content => {
    const reminders = [...this.state.reminders];
    reminders.unshift(content);
    this.setState({ reminders });
  }

  // When a card is dropped on another their positions are swapped in the content array
  onDrop = index => {
    const reminders = [...this.state.reminders];
    const dragged = this.state.dragging;
    // Object destructuring assignment to swap positions
    [reminders[dragged], reminders[index]] = [reminders[index], reminders[dragged]];
    this.setState({ reminders });
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
          {this.state.reminders.map((content, i) => { return (
            <RemindersCard key={content + i} 
                            delete={() => this.setState({deleteIndex: i, isDeleteOpen: true})} 
                            content={content}
                            index={i}
                            drag={() => this.setState({dragging: i})}
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