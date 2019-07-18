import React, { Component } from 'react';
import values from 'lodash/values';
import JournalTreeNode from '../JournalTreeNode/JournalTreeNode';
import Modal from '../../Modal/Modal';
import ModalDeleteEntry from '../../Modal/ModalDeleteEntry/ModalDeleteEntry';
import ModalAddEntry from '../../Modal/ModalAddEntry/ModalAddEntry';
import './JournalSidebar.css';

/*
Management of Journal entries lives here. The visibility of the component is 
determined by the toggle button in the Editor. Buttons at the top allow the 
user to add a new entry with a modal form and to delete an entry by clicking 
or dragging and dropping, resulting in a modal confirmation. The TreeNodes 
form a file tree structure based on the data found in Journal.
*/
class JournalSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddOpen: false,
      isDeleteOpen: false,
      deletingPath: props.currentFile
    }
  }

  // Helper functions to toggle the modal visibility state
  toggleAddModal = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }
  toggleDeleteModal = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  }

  // Returns an array of all the folder paths in including the root
  getFolderPaths = () => {
    const { fileStructure } = this.props;
    const paths = values(fileStructure)
              .filter(node => node.isFolder)
              .map(node => node.path)
              .sort();
    paths.unshift("/");
    return paths;
  }

  // Gets the child nodes of the supplied node
  getChildNodes = nodePath => {
    const { fileStructure } = this.props;
    const node = fileStructure[nodePath];
    if (!node.children) return [];
    return node.children.map(path => fileStructure[path]);
  }

  // Checks the given name to ensure it is a unique item
  checkName = name => {
    const { fileStructure } = this.props;    
    return values(fileStructure).some(node => node.title === name);
  }

  render() {
    const props = this.props;
    return (<>
      <div className="journalsidebar-container">
        {/* Buttons to open the AddEntry and DeleteEntry modals */}
        <div className="journalsidebar-btns">
          <div className="journalsidebar-add-btn" onClick={this.toggleAddModal}>
            <i className="fas fa-plus fa-2x"></i>
          </div>
          {/* Delete button works on both click and on drop. Drag enter and 
          drag over need to be suppressed for the drop operation to work */}
          <div className="journalsidebar-delete-btn"
              onClick={() => {
                this.setState({deletingPath: props.currentFile});
                this.toggleDeleteModal();
              }}
              onDrop={() => {
                this.setState({deletingPath: props.dragged});
                this.toggleDeleteModal();
              }}
              onDragEnter={e => e.preventDefault()}
              onDragOver={e => e.preventDefault()}>
            <i className="fas fa-trash fa-2x"></i>
          </div>
        </div>
        {/* The file tree structure consists of TreeNodes with other child 
        TreeNodes in the case of folders. Functionality from Journal is 
        relayed to the TreeNodes. The root TreeNodes are placed here */}
        {this.getChildNodes("/").map(node => {
          return (<JournalTreeNode {...node} key={node.path}
            getChildNodes={this.getChildNodes}
            toggleNode={props.toggleNode}
            openFile={props.openFile}
            setDragged={props.setDragged}
            droppedOn={props.droppedOn} />
          )})}
      </div>
      {/* The add entry modal is the form to create a new item */}
      <Modal 
          isOpen={this.state.isAddOpen} 
          toggle={this.toggleAddModal}>
        <ModalAddEntry
            createNode={props.createNode}
            toggle={this.toggleAddModal}
            getFolderPaths={this.getFolderPaths}
            checkName={this.checkName} />
      </Modal>
      {/* The delete entry modal is the confirmation to delete an item */}
      <Modal 
          isOpen={this.state.isDeleteOpen} 
          toggle={this.toggleDeleteModal}>
        <ModalDeleteEntry
            deleteNode={props.deleteNode}
            deletingPath={this.state.deletingPath}
            toggle={this.toggleDeleteModal} />
      </Modal>
    </>);
  }
}

export default JournalSidebar;