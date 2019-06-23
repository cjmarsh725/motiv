import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Journal.css';
import values from 'lodash/values';
import JournalEditor from './JournalEditor/JournalEditor';
import JournalSidebar from './JournalSidebar/JournalSidebar';

class Journal extends Component {
  state = {
    fileStructure: {
      "/Entries": {
        title: "Entries",
        isRoot: true,
        isFolder: true,
        isOpen: true,
        indent: 0,
        path: "/Entries",
        children: ["/SubEntries", "/Entries/TestEntry", "/Entries/TestEntry2"]
      }, 
      "/Entries/TestEntry": {
        title: "TestEntry",
        isRoot: false,
        isFolder: false,
        isOpen: true,
        indent: 1,
        path: "/Entries/TestEntry",
        content: null
      }, 
      "/Entries/TestEntry2": {
        title: "TestEntry2",
        isRoot: false,
        isFolder: false,
        isOpen: false,
        indent: 1,
        path: "/Entries/TestEntry2",
        content: null
      },
      "/SubEntries": {
        title: "SubEntries",
        isRoot: false,
        isFolder: true,
        isOpen: false,
        indent: 1,
        path: "/SubEntries",
        children: ["/SubEntries/TestEntry3"]
      }, 
      "/SubEntries/TestEntry3": {
        title: "TestEntry3",
        isRoot: false,
        isFolder: false,
        isOpen: false,
        indent: 2,
        path: "/SubEntries/TestEntry3",
        content: null
      }
    },
    currentFile: "/Entries/TestEntry"
  }

  getRootNodes = () => {
    const { fileStructure } = this.state;
    return values(fileStructure).filter(node => node.isRoot === true);
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

  render() {
    return (
      <Container fluid className="journal-container">
        <Row>
          <Col xs="12" sm="8" lg="9" xl="10">
            <JournalEditor
                updateContent={this.updateContent}
                currentFile={this.state.currentFile}
                deleteFile={this.deleteFile}
                content={this.getContent()}
                fileName={this.getFileName()} />
          </Col>
          <Col xs="3" className="d-flex d-sm-none"></Col>
          <Col xs="6" sm="4" lg="3" xl="2" style={{padding: "0"}}>
            <JournalSidebar 
                fileStructure={this.state.fileStructure}
                getRootNodes={this.getRootNodes}
                getChildNodes={this.getChildNodes}
                toggleNode={this.toggleNode}
                openFile={this.openFile} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Journal;