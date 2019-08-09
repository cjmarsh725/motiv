import React, { Component } from 'react';
import './ModalAddAppointment.css';

class ModalAddAppointment extends Component {
  state = {
    label: "",
    date: "",
    time: "",
    isAM: true
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
            <input className="modaladdappointment-input"
                      type="text"
                      name="label"
                      value={this.state.label}
                      onChange={this.handleChange} />
            <div className="modaladdappointment-datetime-container">
              <input className="modaladdappointment-input modaladdappointment-date-input"
                        type="text"
                        name="date"
                        placeholder="MM-DD-YYYY"
                        value={this.state.date}
                        onChange={this.handleChange} />
              <input className="modaladdappointment-input modaladdappointment-time-input"
                        type="text"
                        name="time"
                        placeholder="HH:MM"
                        value={this.state.time}
                        onChange={this.handleChange} />
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