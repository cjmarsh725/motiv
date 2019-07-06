import React, { Component } from 'react';
import './ModalAddEntry.css';

/*
Interior modal component for adding a new file or folder in the Journal 
Sidebar. Contains a toggle for whether the new item is a file or folder,
an input for a new unique name, a dropdown menu for available parent
folders, and final validation for name uniqueness along with creating the
new file node in Journal's state.
*/
class ModalAddEntry extends Component {
  state = {
    isFile: true,
    name: "",
    parent: "/",
    dropdownOpen: false,
    nameErrorOpen: false,
  }

  nameChange = e => {
    this.setState({name: e.target.value, nameErrorOpen: false});
  }

  // Resets modal to default values then toggles visibility
  closeModal = () => {
    this.setState({
      isFile: true, 
      name: "", 
      parent: "/", 
      dropdownOpen: false,
      nameErrorOpen: false,
    });
    this.props.toggle();
  }

  // Validates the name input, creates a new node, and closes the modal
  handleConfirm = () => {
    const { isFile, name, parent } = this.state;
    // Validate name choice to make sure it is unique
    if (this.props.checkName(name)) {
      this.setState({nameErrorOpen: true});
      return;
    }
    this.props.createNode(isFile, name, parent);
    this.closeModal();
  }

  render() {  
    return (
      <div className="modaladdentry-container">
        <div className="modaladdentry-title">
          Please select item type, a unique name, and a parent folder:
        </div>
        {/* Toggle to select whether new item is a file or folder */}
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
        <div className="modaladdentry-labelinputs-container">
          <div className="modaladdentry-label-container">
            <div className="modaladdentry-name-label">Name:</div>
            <div className="modaladdentry-path-label">Parent:</div>
          </div>
          <div className="modaladdentry-input-container">
            {/* Name input */}
            <input className="modaladdentry-name-input"
                  type="text"
                  value={this.state.name}
                  onChange={this.nameChange} />
            <div className="modaladdentry-name-error-container">
              <div className={this.state.nameErrorOpen ? "" : 
                              "modaladdentry-name-error-toggle"}>
                Must be a unique name
              </div>
            </div>
            {/* Parent path dropdown */}
            <div className="modaladdentry-path-dropdown">
              <div className="modaladdentry-path-dropdown-top"
                   onClick={() => this.setState(
                        {dropdownOpen: !this.state.dropdownOpen})}>
                <div className="modaladdentry-path-dropdown-label">
                  {this.state.parent}
                </div>
                <div className="modaladdentry-path-dropdown-caret">
                  <i className={"fas" + (this.state.dropdownOpen ? 
                      " fa-angle-left" : " fa-angle-down")}></i>
                </div>
              </div>
              {/* Toggleable dropdown content populated with folder paths */}
              <div className={"modaladdentry-path-dropdown-content" + (
                    this.state.dropdownOpen ? 
                    " modaladdentry-path-dropdown-content-toggle" : "")}>
                {this.props.getFolderPaths().map(path => (
                  <div key={path} className="modaladdentry-path-dropdown-item"
                      onClick={() => {
                        this.setState({parent: path,
                                      dropdownOpen: !this.state.dropdownOpen});
                      }}>
                    {path}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Cancel and create buttons */}
        <div className="modaladdentry-confirm-btns">
          <div className="modal-btn"
              onClick={this.closeModal}>
            Cancel
          </div>
          <div className="modal-btn-primary"
              onClick={this.handleConfirm}>
            Create
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddEntry;