import React from 'react';
import './Modal.css';

/*
This is the basic framework for a popup modal which includes the styling 
necessary to bring the div above other content. Consists of a container,
which has the display none property if closed, with the content and mask
inside. The mask is a semi-transparent overlay and the content contains
other Modal components.
*/
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