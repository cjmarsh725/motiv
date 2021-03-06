import React, { Component } from 'react';
import './Journal.css';
import values from 'lodash/values';
import JournalEditor from './JournalEditor/JournalEditor';
import JournalSidebar from './JournalSidebar/JournalSidebar';

/*
The Journal route contains two main areas and the logic to support them: the 
Editor and the Sidebar. The state for the journal entries is kept here along 
with the current file, dragged file, and sidebar visibility toggle. Functions 
include getting, setting, and deleting entry nodes and their properties. In 
addition, drag and drop logic for the TreeNodes in the entry file tree is 
handled here and passed through the Sidebar.
*/
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
        isOpen: true,
        indent: 2,
        parent: "/Entries",
        path: "/Entries/SubEntries",
        children: ["/Entries/SubEntries/TestEntry3", "/Entries/SubEntries/SubSubEntries"]
      }, 
      "/Entries/SubEntries/TestEntry3": {
        title: "TestEntry3",
        isFolder: false,
        isOpen: false,
        indent: 3,
        parent: "/Entries/SubEntries",
        path: "/Entries/SubEntries/TestEntry3",
        content: null
      },
      "/Entries/SubEntries/SubSubEntries": {
        title: "SubSubEntries",
        isFolder: true,
        isOpen: true,
        indent: 3,
        parent: "/Entries/SubEntries",
        path: "/Entries/SubEntries/SubSubEntries",
        children: []
      }
    },
    currentFile: "/Entries/TestEntry",
    sidebarOpen: true,
    dragged: null
  }

  // Helper functions to get the content and title from the current file
  getContent = () => {
    const { currentFile, fileStructure } = this.state;
    if (fileStructure[currentFile]) {
      return fileStructure[currentFile].content;
    }
  }
  getFileName = () => {
    const { currentFile, fileStructure } = this.state;
    if (fileStructure[currentFile]) {
      return fileStructure[currentFile].title;
    }
  }

  // Gets the current file node and changes the content
  updateContent = content => {
    const { currentFile } = this.state;
    const fileStructure = { ...this.state.fileStructure };
    if (currentFile) {
      fileStructure[currentFile].content = content;
      this.setState({ fileStructure });
    }
  }

  // Toggles whether or not a folder is open
  toggleNode = path => {
    const fileStructure = { ...this.state.fileStructure };
    const node = fileStructure[path];
    if (node.isFolder) node.isOpen = !node.isOpen;
    this.setState({ fileStructure });
  }

  // Sets the isOpen property of the node at a given path to true and then
  //  gets the previous node that was open and sets its isOpen to false
  openFile = path => {
    const fileStructure = { ...this.state.fileStructure };
    const node = fileStructure[path];
    if (node) {
      const prevNode = values(fileStructure)
          .find(n => n.isFolder === false && n.isOpen === true);
      if (prevNode) fileStructure[prevNode.path].isOpen = false;
      node.isOpen = true;
      this.setState({ fileStructure, currentFile: path });
    }
  }

  // Recursively delete child items in a folder
  deleteChildren = (path, fileStructure) => {
    let isCurrent = false;
    fileStructure[path].children.forEach(childPath => {
      if (fileStructure[childPath].isFolder) {
        isCurrent = this.deleteChildren(childPath, fileStructure) || isCurrent;
      } else {
        isCurrent = childPath === this.state.currentFile || isCurrent;
      }
      delete fileStructure[childPath];
    });
    return isCurrent;
  }

  // Removes the path property from the fileStructure
  deleteNode = path => {
    const { currentFile } = this.state;
    const fileStructure = { ...this.state.fileStructure };
    const node = fileStructure[path];
    if (node) {
      let isCurrent = path === currentFile;
      if (node.isFolder) { 
        isCurrent = this.deleteChildren(path, fileStructure) || isCurrent;
      }
      const parent = fileStructure[node.parent];
      parent.children = parent.children.filter(child => child !== path);
      delete fileStructure[path];
      this.setState({ 
        fileStructure: fileStructure, 
        currentFile: isCurrent ? null : currentFile
      });
    }
  }

  // Adds a new node to fileStructure with the supplied properties
  createNode = (isFile, title, parent) => {
    const fileStructure = { ...this.state.fileStructure };
    // Build path of new node and allow for the root case to prevent '//'
    const path = (parent === "/" ? "" : parent) + "/" + title;
    // Fill out the node item and increment the indent from the parent
    const newNode = {
      title: title,
      isFolder: !isFile,
      isOpen: isFile,
      indent: fileStructure[parent].indent + 1,
      parent: parent,
      path: path
    }
    // Add a content property if its a file or children if its a folder
    if (isFile) newNode.content = null;
    else newNode.children = [];
    // Add the new node to the parent's children
    fileStructure[parent].children.push(path);
    // Add the node to the fileStructure and update state
    fileStructure[path] = newNode;
    if (isFile) {
      if (this.state.currentFile) fileStructure[this.state.currentFile].isOpen = false;
      this.setState({ fileStructure, currentFile: path });
    } else {
      this.setState({ fileStructure });
    }
  }

  // Updates a nodes parent and, if its a folder, changes its 
  //  children recursively
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
    // If node is a folder edit children too and modify children recursively
    if (newNode.children) {
      newNode.children.forEach((childPath, i) => {
        newNode.children[i] = this.changeParent(fileStructure, fileStructure[childPath], newNode.path);
      });
    }
    // Return path for recursive children editing
    return newNode.path;
  }

  // Recursively searches through a path's parents to find whether or not
  //  the checkedPath is one of the parents
  isInChildren = (fileStructure, path, checkedPath) => {
    const parent = fileStructure[path].parent;
    if (parent === "/") return false;
    if (parent === checkedPath) return true;
    return this.isInChildren(fileStructure, parent, checkedPath);
  }

  // Searches through the file structure to get the current file after
  //  changes have been made from a drag and drop operation
  getCurrentFile = (fileStructure, previousPath, newPath) => {
    if (previousPath === newPath || previousPath === null)
      return previousPath;
    // Separates path to extract title
    const pathSegments = previousPath.split("/");
    if (!pathSegments.length) return null;
    // Gets an array of nodes with a matching title to the previousPath
    const matchingNodes = values(fileStructure).filter(node => 
        node.title === pathSegments[pathSegments.length - 1]);
    if (!matchingNodes.length) return null;
    // Returns the path of the node with a matching title
    return matchingNodes[0].path;
  }

  // Handles onDrop event for draggable JournalTreeNodes
  // "path" is from the node dropped over
  // "direction" is whether it was dropped on 
  //     the top, bottom, or middle of the node
  droppedOn = (path, direction) => {
    const { dragged, currentFile } = this.state;
    const fileStructure = { ...this.state.fileStructure };
    // Check to see if item is being placed in its own child or itself
    if (this.isInChildren(fileStructure, path, dragged) || path === dragged) 
      return;
    // Get the parents of the dragged and dropped nodes
    const oldParent = fileStructure[dragged].parent;
    let newParent = fileStructure[path].parent;
    // If the node is being dropped onto a folder change the parent
    //  to the dragged over node
    if (direction === "middle") newParent = path;
    // Initialize path as the dragged node and change if moving folders
    let newPath = dragged;
    // When not in the same folder get new path and recursively
    //  change paths to new folder structure
    if (newParent !== oldParent) newPath = this.changeParent(fileStructure, fileStructure[dragged], newParent);
    // Remove old path from children array of old node's parent
    let children = fileStructure[oldParent].children;
    children.splice(children.indexOf(dragged), 1);
    // Change to new parent's children to insert new path
    children = fileStructure[newParent].children;
    // Get index to insert to based on the top or bottom direction
    const index = children.indexOf(path) + (direction === "top" ? 0 : 1);
    // Insert node's path to parent's children array at index
    children.splice(index, 0, newPath);
    // Update state, including currentFile if it's being dragged
    this.setState({ fileStructure, currentFile: this.getCurrentFile(fileStructure, currentFile, newPath) });
  }

  // Rendering split into two containers, an editor and a sidebar
  render() {
    return (
      <div className="journal-container">
        <div className="journal-journaleditor" >
          <JournalEditor
              updateContent={this.updateContent}
              toggleSidebar={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}
              sidebarOpen={this.state.sidebarOpen}
              currentFile={this.state.currentFile}
              content={this.getContent()}
              fileName={this.getFileName()} />
        </div>
        <div className={"journal-journalsidebar" + 
             (this.state.sidebarOpen ? "" : " journal-journalsidebar-closed")}>
          <JournalSidebar 
              fileStructure={this.state.fileStructure}
              toggleNode={this.toggleNode}
              openFile={this.openFile}
              currentFile={this.state.currentFile}
              deleteNode={this.deleteNode}
              createNode={this.createNode}
              dragged={this.state.dragged}
              setDragged={path => this.setState({dragged: path})}
              droppedOn={this.droppedOn} />
        </div>
      </div>
    );
  }
}

export default Journal;