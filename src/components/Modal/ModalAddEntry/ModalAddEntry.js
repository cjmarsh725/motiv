import React from 'react';
import './ModalAddEntry.css';

const ModalAddEntry = props => {
  return (
    <div className="modaladdentry-container">
      <div className="modaladdentry-title">
        Please select item type, a unique name, and its folder:
      </div>
      <div className="modaladdentry-btns">
        <div className="modaladdentry-create-btn"
             onClick={() => {
               // props.createNode - TODO
               props.toggle();
              }}>
          Create
        </div>
        <div className="modaladdentry-cancel-btn"
             onClick={props.toggle}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default ModalAddEntry;