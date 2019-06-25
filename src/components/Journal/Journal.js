import React, { Component } from 'react';
import './Journal.css';
import values from 'lodash/values';
import JournalEditor from './JournalEditor/JournalEditor';
import JournalSidebar from './JournalSidebar/JournalSidebar';

class Journal extends Component {
  state = {
    fileStructure: {
      "/Entries": {
        title: "Entries",
        isFolder: true,
        isOpen: true,
        indent: 0,
        parent: "/",
        path: "/Entries",
        children: ["/Entries/SubEntries", "/Entries/TestEntry", "/Entries/TestEntry2"]
      }, 
      "/Entries/TestEntry": {
        title: "TestEntry",
        isFolder: false,
        isOpen: true,
        indent: 1,
        parent: "/Entries",
        path: "/Entries/TestEntry",
        content: null
      }, 
      "/Entries/TestEntry2": {
        title: "TestEntry2",
        isFolder: false,
        isOpen: false,
        indent: 1,
        parent: "/Entries",
        path: "/Entries/TestEntry2",
        content: null
      },
      "/Entries/SubEntries": {
        title: "SubEntries",
        isFolder: true,
        isOpen: false,
        indent: 1,
        parent: "/Entries",
        path: "/Entries/SubEntries",
        children: ["/Entries/SubEntries/TestEntry3"]
      }, 
      "/Entries/SubEntries/TestEntry3": {
        title: "TestEntry3",
        isFolder: false,
        isOpen: false,
        indent: 2,
        parent: "/Entries/SubEntries",
        path: "/Entries/SubEntries/TestEntry3",
        content: null
      }
    },
    currentFile: "/Entries/TestEntry",
    sidebarOpen: true,
    dragged: null
  }

  getRootNodes = () => {
    const { fileStructure } = this.state;
    return values(fileStructure).filter(node => node.parent === "/");
  }

  getChildNodes = nodePath => {
    const { fileStructure } = this.state;
    const node = fileStructure[nodePath];
    if (!node.children) return [];
    return node.children.map(path => fileStructure[path]);
  }

  toggleNode = path => {
    const { fileStructure } = this.state;
    const node = fileStructure[path];
    if (node.isFolder) node.isOpen = !node.isOpen;
    this.setState({ fileStructure });
  }

  updateContent = content => {
    if (this.state.currentFile) {
      const { fileStructure } = this.state;
      fileStructure[this.state.currentFile].content = content;
      this.setState({ fileStructure });
    }
  }

  getContent = () => {
    if (this.state.fileStructure[this.state.currentFile]) {
      return this.state.fileStructure[this.state.currentFile].content;
    }
  }

  getFileName = () => {
    if (this.state.fileStructure[this.state.currentFile]) {
      return this.state.fileStructure[this.state.currentFile].title;
    }
  }

  openFile = path => {
    const { fileStructure } = this.state;
    const node = fileStructure[path];
    if (node) {
      const prevNode = values(fileStructure)
          .find(n => n.isFolder === false && n.isOpen === true);
      if (prevNode) fileStructure[prevNode.path].isOpen = false;
      node.isOpen = true;
      this.setState({ fileStructure: fileStructure, currentFile: path });
    }
  }

  deleteFile = path => {
    const { fileStructure } = this.state;
    const node = fileStructure[path];
    if (node) {
      const parent = fileStructure[
        node.path.replace("/" + node.title, "")
      ];
      if (parent) {
        parent.children = parent.children.filter(child => child.path !== path);
      }
      delete fileStructure[path];
      this.setState({ fileStructure: fileStructure, currentFile: null });
    }
  }

  // Handles onDrop event for draggable JournalTreeNodes
  // "path" is from the node dropped over
  // "direction" is whether it was dropped on the top or bottom of the node
  dropped = (path, direction) => {
    const { fileStructure, dragged } = this.state;
    // When not in the same folder:
    if (fileStructure[path].parent !== 
        fileStructure[dragged].parent) {
    } else { // When in the same folder:
      // Children array of path's parent
      const children = fileStructure[fileStructure[path].parent].children;
      children.splice(children.indexOf(dragged), 1);
      // Get index to insert to based on the top or bottom direction
      const index = children.indexOf(path) + 
                    (direction === "bottom" ? 1 : 0);
      // Insert dragged to children array at index
      children.splice(index, 0, dragged);
    }
    this.setState({fileStructure});
  }

  render() {
    return (
      <div className="journal-container">
        <div className="journal-journaleditor" >
          <JournalEditor
              updateContent={this.updateContent}
              currentFile={this.state.currentFile}
              deleteFile={this.deleteFile}
              toggleSidebar={() => 
                this.setState({sidebarOpen: !this.state.sidebarOpen})}
              sidebarOpen={this.state.sidebarOpen}
              content={this.getContent()}
              fileName={this.getFileName()} />
        </div>
        <div className={"journal-journalsidebar" + 
             (this.state.sidebarOpen ? "" : " journal-journalsidebar-closed")}>
          <JournalSidebar 
              fileStructure={this.state.fileStructure}
              getRootNodes={this.getRootNodes}
              getChildNodes={this.getChildNodes}
              toggleNode={this.toggleNode}
              openFile={this.openFile}
              setDragged={path => this.setState({dragged: path})}
              dropped={this.dropped} />
        </div>
      </div>
    );
  }
}

export default Journal;