import React, { Component } from 'react';
import './ModalDeleteAppointment.css';

class ModalDeleteAppointment extends Component {
  state = {
    isSelected: Array(this.props.schedule.length).fill(false)
  }

  handleClick = index => {
    const isSelected = [...this.state.isSelected];
    isSelected[index] = !isSelected[index];
    this.setState({ isSelected });
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
                this.props.toggle();
                }}>
            Delete
          </div>
          <div className="modal-btn" onClick={this.props.toggle}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDeleteAppointment;