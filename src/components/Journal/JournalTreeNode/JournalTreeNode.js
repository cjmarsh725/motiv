import React, { Component } from 'react';
import './JournalTreeNode.css';

class JournalTreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: null
    }
  }

  getIcon = (isFolder, isOpen) => {
    if (isFolder) {
      if (isOpen) return <i className="fas fa-folder-open"></i>;
      else return <i className="fas fa-folder"></i>;
    } else {
      if (isOpen) return <i className="fas fa-file-alt"></i>;
      else return <i className="fas fa-file"></i>;
    }
  }

  getBorderClass = () => {
    if (this.state.drag === "top") return " journaltreenode-label-top";
    if (this.state.drag === "bottom") return " journaltreenode-label-bottom";
  }

  onDragStart = e => {
    e.stopPropagation();
    this.props.setDragged(this.props.path);
  }

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    // Get the Y midpoint of the element
    const rect = e.target.getBoundingClientRect();
    const midpoint = (rect.bottom - rect.top) / 2 + rect.top;
    /* If the mouse Y pos is "higher" than the midpoint 
    and state needs to be refreshed: */
    if (e.clientY < midpoint && this.state.drag !== "top") {
      this.setState({drag: "top"});
    // Else if lower and state needs to be refreshed:
    } else if (e.clientY > midpoint && this.state.drag !== "bottom") {
      this.setState({drag: "bottom"});
    }
  }

  onDrop = e => {
    e.stopPropagation();
    if (this.state.drag) {
      this.props.dropped(this.props.path, this.state.drag);
      this.setState({drag: null});
    }
  }

  onDragLeave = e => {
    e.stopPropagation();
    this.setState({drag: null});
  }

  render() {
    const props = this.props;
    return (
      <div className="journaltreenode-container"
            draggable
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            onDragLeave={this.onDragLeave}>
        <div className="journaltreenode-bg" onClick={() => {
            props.toggleNode(props.path);
            if (!props.isFolder) props.openFile(props.path);
          }}>
          <div className={"journaltreenode-label no-select"
                                 + this.getBorderClass()} 
               style={{marginLeft: props.indent * 10 + "px"}}>
            <div className="journaltreennode-icon">
              {this.getIcon(props.isFolder, props.isOpen)}
            </div>
            <div>{props.title}</div>
          </div>
        </div>
        {props.isOpen ? props.getChildNodes(props.path).map(node => {
          if (node === undefined) return null;
          return (<JournalTreeNode {...node} key={node.path}
            getChildNodes={props.getChildNodes} 
            toggleNode={props.toggleNode}
            openFile={props.openFile}
            setDragged={props.setDragged}
            dropped={props.dropped} />
        )}) : null}
      </div>
    );
  }
}

export default JournalTreeNode;