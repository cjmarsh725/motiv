import React, { Component } from 'react';
import './ModalAddEntry.css';

class ModalAddEntry extends Component {
  state = {
    name: ""
  }

  nameChange = e => {
    this.setState({name: e.target.value});
  }

  render() {  
    return (
      <div className="modaladdentry-container">
        <div className="modaladdentry-title">
          Please select item type, a unique name, and a parent folder:
        </div>
        <div className="modaladdentry-type-btns">
          <div className="modaladdentry-file-btn">File</div>
          <div className="modaladdentry-folder-btn">Folder</div>
        </div>
        <div className="modaladdentry-name-container">
          <div className="modaladdentry-name-label">Name:</div>
          <input className="modaladdentry-name-input"
                type="text"
                value={this.state.name}
                onChange={this.nameChange} />
        </div>
        <div className="modaladdentry-path-container">
          
        </div>
        <div className="modaladdentry-confirm-btns">
          <div className="modaladdentry-cancel-btn"
              onClick={this.props.toggle}>
            Cancel
          </div>
          <div className="modaladdentry-create-btn"
              onClick={() => {
                // props.createNode - TODO
                this.props.toggle();
              }}>
            Create
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddEntry;