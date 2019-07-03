import React, { Component } from 'react';
import './ModalAddEntry.css';

class ModalAddEntry extends Component {
  state = {
    isFile: true,
    name: "",
    parent: "/"
  }

  nameChange = e => {
    this.setState({name: e.target.value});
  }

  closeModal = () => {
    this.setState({name: "", isFile: true});
    this.props.toggle();
  }

  render() {  
    return (
      <div className="modaladdentry-container">
        <div className="modaladdentry-title">
          Please select item type, a unique name, and a parent folder:
        </div>
        <div className="modaladdentry-type-btns">
          <div className={"modaladdentry-file-btn" +
                (this.state.isFile ? " modaladdentry-type-btn-active" : "")}
               onClick={() => this.setState({isFile: true})}>
              File
          </div>
          <div className={"modaladdentry-folder-btn" +
                (!this.state.isFile ? " modaladdentry-type-btn-active" : "")}
               onClick={() => this.setState({isFile: false})}>
            Folder
          </div>
        </div>
        <div className="modaladdentry-name-container">
          <div className="modaladdentry-name-label">Name:</div>
          <input className="modaladdentry-name-input"
                type="text"
                value={this.state.name}
                onChange={this.nameChange} />
        </div>
        <div className="modaladdentry-path-container">
          <div>Parent:</div>
          <div className="modaladdentry-path-dropdown">
            <div className="modaladdentry-path-dropdown-top">
              {this.state.parent}
            </div>
          </div>
          {/* {this.props.getFolderPaths().map(path => <div>{path}</div>)} */}
        </div>
        <div className="modaladdentry-confirm-btns">
          <div className="modaladdentry-cancel-btn"
              onClick={this.closeModal}>
            Cancel
          </div>
          <div className="modaladdentry-create-btn"
              onClick={() => {
                // props.createNode - TODO
                this.closeModal();
              }}>
            Create
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddEntry;