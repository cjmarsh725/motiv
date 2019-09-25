import React, { Component } from 'react';
import moment from 'moment';
import './ModalAddAppointment.css';

/*
Interior modal component for adding appointments. Toggled when the add button in the appointments section
is clicked. Takes in a function to add an appointment and the modal toggle function as props.
*/
class ModalAddAppointment extends Component {
  state = {
    label: "",
    date: "",
    time: "",
    isAM: true,
    isLabelValid: true,
    isDateValid: true,
  }

  // Helper functions to set the label and date and reset the validation flag
  handleLabelChange = e => {
    this.setState({[e.target.name]: e.target.value, isLabelValid: true});
  }
  handleDateChange = e => {
    this.setState({[e.target.name]: e.target.value, isDateValid: true});
  }

  // Validates an appointment date and label and sets the validation flags, adding the appointment if valid
  validateAppointment = () => {
    const { label, date, time, isAM } = this.state;
    // Parse the state into a moment object
    const m = moment(`${date} ${time} ${isAM ? "AM" : "PM"}`, "M-D-YYYY h:mm A", true);
    // Label cannot be an empty string
    const isLabelValid = label !== "";
    // Date must be a valid moment object
    const isDateValid = m.isValid();
    // Add the appointment and toggle the modal if valid
    if (isLabelValid && isDateValid) {
      this.props.addAppointment(label, m);
      this.props.toggle();
    }
    // Set the validation flags to display the appropriate error message if needed
    this.setState({ isLabelValid, isDateValid });
  }

  render() {
    return (
      <div className="modaladdappointment-container">
        <div className="modaladdappointment-title">
          Add a new appointment:
        </div>
        <div className="modaladdappointment-labelinputs-container">
          <div className="modaladdappointment-label-container">
            <div className={"modaladdappointment-label" + (this.state.isLabelValid ?
                            "" : " modaladdappointment-label-error")}>
              Label:
            </div>
            <div className={"modaladdappointment-label" + (this.state.isDateValid ?
                            "" : " modaladdappointment-label-error")}>
              Date:
            </div>
          </div>
          <div className="modaladdappointment-input-container">
            <input className="modaladdappointment-input"
                    type="text"
                    name="label"
                    value={this.state.label}
                    onChange={this.handleLabelChange} />
            <div className="modaladdappointment-datetime-container">
              <input className="modaladdappointment-input modaladdappointment-date-input"
                      type="text"
                      name="date"
                      placeholder="MM-DD-YYYY"
                      value={this.state.date}
                      onChange={this.handleDateChange} />
              <input className="modaladdappointment-input modaladdappointment-time-input"
                      type="text"
                      name="time"
                      placeholder="HH:MM"
                      value={this.state.time}
                      onChange={this.handleDateChange} />
              <div className="modaladdappointment-ampm-btns">
                <div className={"modaladdappointment-am-btn" +
                      (this.state.isAM ? " modaladdappointment-ampm-btn-active" : "")}
                      onClick={() => this.setState({isAM: true})}>
                  AM
                </div>
                <div className={"modaladdappointment-pm-btn" +
                      (!this.state.isAM ? " modaladdappointment-ampm-btn-active" : "")}
                      onClick={() => this.setState({isAM: false})}>
                  PM
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modaladdappointment-btns">
          <div className="modal-btn-primary" onClick={this.validateAppointment}>
            Add
          </div>
          <div className="modal-btn" onClick={this.props.toggle}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddAppointment;