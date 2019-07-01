import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './JournalEditor.css';

class JournalEditor extends Component {

  attachRef = ref => {
    if (ref) ref.getEditor().root.setAttribute("spellcheck", false);
  }

  handleChange = value => {
    this.props.updateContent(value);
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
        </div>
        <ReactQuill placeholder="Start here..."
                ref={this.attachRef}
                value={this.props.content || ""}
                onChange={this.handleChange}
                modules={{clipboard: {matchVisual: false}}} />
        </>) : null}
      </div>
      </>
    );
  }
}

export default JournalEditor;