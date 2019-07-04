import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './JournalEditor.css';

/*
The primary area of the Journal that contains the Quill rich text editor and 
a toggle button to collapse the Sidebar. Relays changes in the text editor to 
Journal where it is updated in the current file. When there is no current 
file (ie after a deletion) then nothing is displayed in the main area besides 
the toggle button.
*/
class JournalEditor extends Component {

  // Workaround to get the Quill editor and attach the spellcheck attribute
  attachRef = ref => {
    if (ref) ref.getEditor().root.setAttribute("spellcheck", false);
  }

  // Updates the content of the current file in Journal's state
  handleChange = value => {
    this.props.updateContent(value);
  }

  render() {
    return (
      <>
      <div className="journaleditor-toggle-sidebar-container">
        {/* Button to toggle the sidebar visibility */}
        <div className="journaleditor-toggle-sidebar"
            onClick={this.props.toggleSidebar}>
          {this.props.sidebarOpen ? 
            <i className="fas fa-angle-double-right fa-lg" style={{marginLeft: "4px"}}></i> :
            <i className="fas fa-angle-double-left fa-lg"></i>}
        </div>
      </div>
      {/* Editor displays the current file if there is one with a title and the 
      Quill text editor */}
      <div className="journaleditor-container">
        {this.props.currentFile ? ( <>
        <div className="journaleditor-header">
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