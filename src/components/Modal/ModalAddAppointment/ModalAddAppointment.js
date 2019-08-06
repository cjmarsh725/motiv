import React from 'react';
import './ModalAddAppointment.css';

const ModalAddAppointment = props => {
  return (
    <div className="modaladdappointment-container">
      <div className="modaladdappointment-title">
        Add a new appointment:
      </div>
      <div className="modaladdappointment-btns">
        <div className="modal-btn" onClick={props.toggle}>
          Cancel
        </div>
        <div className="modal-btn-primary"
             onClick={() => {
               props.toggle();
              }}>
          Add
        </div>
      </div>
    </div>
  );
}

export default ModalAddAppointment;