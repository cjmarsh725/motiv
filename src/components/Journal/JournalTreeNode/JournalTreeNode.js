import React from 'react';
import './JournalTreeNode.css';

const getIcon = (isFolder, isOpen) => {
  if (isFolder) {
    if (isOpen) return <i className="fas fa-folder-open"></i>;
    else return <i className="fas fa-folder"></i>;
  } else {
    if (isOpen) return <i className="fas fa-file-alt"></i>;
    else return <i className="fas fa-file"></i>;
  }
}

const JournalTreeNode = props => {
  return (
    <div className="journaltreenode-container">
      <div className="journaltreenode-bg" onClick={() => {
          props.toggleNode(props.path);
          if (!props.isFolder) props.openFile(props.path);
        }}>
        <div className="journaltreenode-label no-select" style={{marginLeft: props.indent * 10 + "px"}}>
          <div className="journaltreennode-icon">
            {getIcon(props.isFolder, props.isOpen)}
          </div>
          <div>{props.title}</div>
        </div>
      </div>
      {props.isOpen ? props.getChildNodes(props.path).map(node => {
        if (node === undefined) return null;
        return (<JournalTreeNode {...node} key={node.path}
          getChildNodes={props.getChildNodes} 
          toggleNode={props.toggleNode}
          openFile={props.openFile} />
      )}) : null}
    </div>
  );
}

export default JournalTreeNode;