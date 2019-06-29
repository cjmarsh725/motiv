import React from 'react';
import './Modal.css';

const Modal = props => {
  return (
    <div className={props.isOpen ? null : "modal-closed"}>
      <div className="modal-content">
        {props.children}
      </div>
      <div className="modal-mask" onClick={props.toggle}></div>
    </div>
  );
}

export default Modal;