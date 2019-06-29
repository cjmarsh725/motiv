import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import Modal from '../../Modal/Modal';
import ModalDeleteEntry from '../../Modal/ModalDeleteEntry/ModalDeleteEntry';
import 'react-quill/dist/quill.snow.css';
import './JournalEditor.css';

class JournalEditor extends Component {
  state = {
    isDeleteOpen: false
  }

  attachRef = ref => {
    if (ref) ref.getEditor().root.setAttribute("spellcheck", false);
  }

  handleChange = value => {
    this.props.updateContent(value);
  }

  toggleDeleteModal = () => {
    this.setState({isDeleteOpen: !this.state.isDeleteOpen});
  }

  render() {
    return (
      <>
      <div className="journaleditor-toggle-sidebar-container">
        <div className="journaleditor-toggle-sidebar"
            onClick={this.props.toggleSidebar}>
          {this.props.sidebarOpen ? 
            <i className="fas fa-angle-double-right fa-lg" style={{marginLeft: "4px"}}></i> :
            <i className="fas fa-angle-double-left fa-lg"></i>}
        </div>
      </div>
      <div className="journaleditor-container">
        {this.props.currentFile ? ( <>
        <div className="journaleditor-header no-select">
          <div className="journaleditor-entryname">
            {this.props.fileName}
          </div>
          <div className="journaleditor-trash" 
                onClick={this.toggleDeleteModal}>
            <i className="fas fa-trash"></i>
          </div>
        </div>
        <ReactQuill placeholder="Start here..."
                ref={this.attachRef}
                value={this.props.content || ""}
                onChange={this.handleChange}
                modules={{clipboard: {matchVisual: false}}} />
        </>) : null}
      </div>
      <Modal 
          isOpen={this.state.isDeleteOpen} 
          toggle={this.toggleDeleteModal}>
        <ModalDeleteEntry
            deleteFile={this.props.deleteFile}
            currentFile={this.props.currentFile}
            toggle={this.toggleDeleteModal} />
      </Modal>
      </>
    );
  }
}

export default JournalEditor;