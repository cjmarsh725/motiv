import React from 'react';
import './ModalDeleteAppointment.css';

const ModalDeleteAppointment = props => {
  return (
    <div className="modaldeleteappointment-container">
      <div className="modaldeleteappointment-title">
        Delete an appointment:
      </div>
      <div className="modaldeleteappointment-btns">
        <div className="modal-btn-primary"
             onClick={() => {
               props.toggle();
              }}>
          Delete
        </div>
        <div className="modal-btn" onClick={props.toggle}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteAppointment;