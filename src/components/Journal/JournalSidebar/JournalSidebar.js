import React, { Component } from 'react';
import JournalTreeNode from '../JournalTreeNode/JournalTreeNode';
import Modal from '../../Modal/Modal';
import ModalDeleteEntry from '../../Modal/ModalDeleteEntry/ModalDeleteEntry';
import './JournalSidebar.css';

class JournalSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddOpen: false,
      isDeleteOpen: false
    }
  }

  toggleAddModal = () => {
    this.setState({isAddOpen: !this.state.isAddOpen});
  }

  toggleDeleteModal = () => {
    this.setState({isDeleteOpen: !this.state.isDeleteOpen});
  }

  render() {
    const props = this.props;
    return (<>
      <div className="journalsidebar-container">
        <div className="journalsidebar-btns">
          <div className="journalsidebar-add-btn"
              onClick={this.toggleAddModal}>
            <i className="fas fa-plus fa-2x"></i>
          </div>
          <div className="journalsidebar-delete-btn"
              onClick={() => {
                if (props.currentFile) 
                  this.toggleDeleteModal();
                }}>
            <i className="fas fa-trash fa-2x"></i>
          </div>
        </div>
        {props.getChildNodes("/").map(node => {
          return (<JournalTreeNode {...node} key={node.path}
            getChildNodes={props.getChildNodes}
            toggleNode={props.toggleNode}
            openFile={props.openFile}
            setDragged={props.setDragged}
            droppedOn={props.droppedOn} />
          )})}
      </div>
      <Modal isOpen={this.state.isAddOpen} 
             toggle={this.toggleAddModal}>
      </Modal>
      <Modal 
          isOpen={this.state.isDeleteOpen} 
          toggle={this.toggleDeleteModal}>
        <ModalDeleteEntry
            deleteNode={props.deleteNode}
            currentFile={props.currentFile}
            toggle={this.toggleDeleteModal} />
      </Modal>
    </>);
  }
}

export default JournalSidebar;