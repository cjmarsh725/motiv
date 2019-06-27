import React, { Component } from 'react';
import './Journal.css';
import values from 'lodash/values';
import JournalEditor from './JournalEditor/JournalEditor';
import JournalSidebar from './JournalSidebar/JournalSidebar';

class Journal extends Component {
  state = {
    fileStructure: {
      "/": {
        indent: 0,
        path: "/",
        children: ["/Entries"]
      },
      "/Entries": {
        title: "Entries",
        isFolder: true,
        isOpen: true,
        indent: 1,
        parent: "/",
        path: "/Entries",
        children: ["/Entries/SubEntries", "/Entries/TestEntry", "/Entries/TestEntry2"]
      }, 
      "/Entries/TestEntry": {
        title: "TestEntry",
        isFolder: false,
        isOpen: true,
        indent: 2,
        parent: "/Entries",
        path: "/Entries/TestEntry",
        content: null
      }, 
      "/Entries/TestEntry2": {
        title: "TestEntry2",
        isFolder: false,
        isOpen: false,
        indent: 2,
        parent: "/Entries",
        path: "/Entries/TestEntry2",
        content: null
      },
      "/Entries/SubEntries": {
        title: "SubEntries",
        isFolder: true,
        isOpen: false,
        indent: 2,
        parent: "/Entries",
        path: "/Entries/SubEntries",
        children: ["/Entries/SubEntries/TestEntry3"]
      }, 
      "/Entries/SubEntries/TestEntry3": {
        title: "TestEntry3",
        isFolder: false,
        isOpen: false,
        indent: 3,
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

  changeParent = (fileStructure, node, newParent) => {
    // Clone the original node
    const newNode = Object.assign({}, node);
    // Assign the new parent
    newNode.parent = newParent;
    // Create the new path from the title and the parent's path
    newNode.path = newParent + (newParent === "/" ? "" : "/") + newNode.title;
    // Get the indent from the parent and increment it
    newNode.indent = fileStructure[newParent].indent + 1;
    // Delete the old node and assign the new one
    delete fileStructure[node.path];
    fileStructure[newNode.path] = newNode;
    // If node is a folder edit children too and modify children array
    if (newNode.children) {
      newNode.children.forEach((childPath, i) => {
        newNode.children[i] = this.changeParent(fileStructure, 
                            fileStructure[childPath], newNode.path);
      });
    }
    // Return path for recursive children editing
    return newNode.path;
  }

  // Handles onDrop event for draggable JournalTreeNodes
  // "path" is from the node dropped over
  // "direction" is whether it was dropped on 
  //     the top, bottom, or middle of the node
  droppedOn = (path, direction) => {
    const { fileStructure, dragged } = this.state;
    const newParent = fileStructure[path].parent;
    const oldParent = fileStructure[dragged].parent;
    //if (!fileStructure[newParent] || oldParent === "/") return;
    const siblings = fileStructure[newParent].children;
    // When not in the same folder:
    if (newParent !== oldParent) {
      // ------ Deprecated -------
      // // Clone the obj being dragged
      // const newNode = Object.assign({}, fileStructure[dragged]);
      // // Create the new path from the title and the parent's path
      // const newPath = newParent + "/" + newNode.title;
      // // Assign updated values to obj
      // newNode.parent = newParent;
      // newNode.path = newPath;
      // newNode.indent = fileStructure[newParent].indent + 1;
      // // Destroy old obj property and create new one with clone
      // delete fileStructure[dragged];
      // fileStructure[newPath] = newNode;
      // -------------------------
      // Remove reference to node in parent
      const children = fileStructure[oldParent].children;
      children.splice(children.indexOf(dragged), 1);
      // Get new path and change path dependencies
      const newPath = this.changeParent(
                      fileStructure, fileStructure[dragged], newParent);
      // Update new parent's children with new node's path
      siblings.push(newPath);
    } else {
      // When in the same folder:
      // Children array of path's parent
      siblings.splice(siblings.indexOf(dragged), 1);
      // Get index to insert to based on the top or bottom direction
      const index = siblings.indexOf(path) + 
                    (direction === "bottom" ? 1 : 0);
      // Insert dragged to siblings array at index
      siblings.splice(index, 0, dragged);
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
              droppedOn={this.droppedOn} />
        </div>
      </div>
    );
  }
}

export default Journal;