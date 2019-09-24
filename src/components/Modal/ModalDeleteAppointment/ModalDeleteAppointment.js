import React, { Component } from 'react';
import './ModalDeleteAppointment.css';

/*
Interior modal component for deleting appointments in the calendar. Toggled when
the delete button in the ScheduleList is clicked. Takes in the modal toggle function, 
deleting function, and the schedule as props.
*/
class ModalDeleteAppointment extends Component {
  // The checked state of the schedule is populated as false initially
  state = {
    isSelected: Array(this.props.schedule.length).fill(false)
  }

  // Sets the selected status for individual appointments when clicked
  handleClick = index => {
    const isSelected = [...this.state.isSelected];
    isSelected[index] = !isSelected[index];
    this.setState({ isSelected });
  }

  // Resets the isSelected state to be all false when the component updates
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.schedule !== this.props.schedule) {
      this.setState({ isSelected: Array(this.props.schedule.length).fill(false) });
    }
  }

  render() {
    return (
      <div className="modaldeleteappointment-container">
        <div className="modaldeleteappointment-title">
          Delete an appointment:
        </div>
        {/* Returns a list of appointments that are interactable */}
        <div className="modaldeleteappointment-schedule">
          {this.props.schedule.map((appointment, i) => { return (
            <div className="modaldeleteappointment-appointment" onClick={() => this.handleClick(i)}>
              <div className="modaldeleteappointment-appointment-toggle">
                {this.state.isSelected[i] ? <div className="modaldeleteappointment-appointment-toggle-interior"></div> : null}
              </div>
              <div className="modaldeleteappointment-appointment-label">{appointment.label}</div>
              <div className="modaldeleteappointment-appointment-date">{appointment.date}</div>
            </div>
          );})}
        </div>
        <div className="modaldeleteappointment-btns">
          {/* The delete button collects the indices of the selected appointments and deletes them then toggles the modal */}
          <div className="modal-btn-primary"
              onClick={() => {
                const indexArray = [];
                this.state.isSelected.forEach((selected, i) => {
                  if (selected) indexArray.push(i);
                });
                this.props.deleteAppointment(indexArray);
                this.props.toggle();
              }}>
            Delete
          </div>
          {/* The cancel button toggles the modal after reseting isSelected to false */}
          <div className="modal-btn" 
              onClick={() => {
                this.setState({ isSelected: Array(this.props.schedule.length).fill(false) });
                this.props.toggle();
              }}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDeleteAppointment;