import React, { Component } from 'react';
import './ModalAddAppointment.css';

class ModalAddAppointment extends Component {
  state = {
    label: "",
    date: ""
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="modaladdappointment-container">
        <div className="modaladdappointment-title">
          Add a new appointment:
        </div>
        <div className="modaladdappointment-labelinputs-container">
          <div className="modaladdappointment-label-container">
            <div className="modaladdappointment-label">Label:</div>
            <div className="modaladdappointment-label">Time:</div>
          </div>
          <div className="modaladdappointment-input-container">
            <input className="modaladdappointment-label-input"
                      type="text"
                      name="label"
                      value={this.state.label}
                      onChange={this.handleChange} />
            <input className="modaladdappointment-label-input"
                      type="text"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleChange} />
          </div>
        </div>
        <div className="modaladdappointment-btns">
          <div className="modal-btn" onClick={this.props.toggle}>
            Cancel
          </div>
          <div className="modal-btn-primary"
              onClick={() => {
                this.props.toggle();
                }}>
            Add
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddAppointment;