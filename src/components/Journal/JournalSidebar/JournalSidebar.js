import React from 'react';
import JournalTreeNode from '../JournalTreeNode/JournalTreeNode';
import './JournalSidebar.css';

const JournalSidebar = props => {
  return (
    <div className="journalsidebar-container">
      <div className="journalsidebar-add-btn">
        <i className="fas fa-plus fa-2x"></i>
      </div>
      {props.getRootNodes().map(node => {
        return (<JournalTreeNode {...node} key={node.path}
          getChildNodes={props.getChildNodes}
          toggleNode={props.toggleNode}
          openFile={props.openFile}
          setDragged={props.setDragged}
          dropped={props.dropped} />
        )})}
    </div>
  );
}

export default JournalSidebar;