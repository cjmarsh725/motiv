import React, { Component } from 'react';
import './ModalDeleteAppointment.css';

/*
Interior modal component for deleting appointments in the calendar. Toggled when
the delete button in the ScheduleList is clicked. Takes in the modal toggle function, 
deleting function, and the schedule as props.
*/
class ModalDeleteAppointment extends Component {
  state = {
    isSelected: Array(this.props.schedule.length).fill(false)
  }

  handleClick = index => {
    const isSelected = [...this.state.isSelected];
    isSelected[index] = !isSelected[index];
    this.setState({ isSelected });
  }

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