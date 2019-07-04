import React, { Component } from 'react';
import './JournalTreeNode.css';

/*
This is the recursively mounted TreeNode structure that forms the file tree 
of Journal entries. It enables drag events and highlights based on where 
another node was dragged over, indicating the insertion point in the tree. 
The highlight is based on the mouse position captured from the drag over 
event and the background can also be highlighted when the node is a folder
*/
class JournalTreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: null
    }
  }

  // Gets the icon for open and closed files and folders
  getIcon = (isFolder, isOpen) => {
    if (isFolder) {
      if (isOpen) return <i className="fas fa-folder-open"></i>;
      else return <i className="fas fa-folder"></i>;
    } else {
      if (isOpen) return <i className="fas fa-file-alt"></i>;
      else return <i className="fas fa-file"></i>;
    }
  }

  // Helper method which returns the border highlighting a drag over effect
  getBorderClass = () => {
    if (this.state.drag === "top") return " journaltreenode-label-top";
    if (this.state.drag === "bottom") return " journaltreenode-label-bottom";
  }

  // Sets the dragged state property in Journal to the TreeNode being dragged
  onDragStart = e => {
    e.stopPropagation();
    this.props.setDragged(this.props.path);
  }

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    // Bounding rect for the element dragged over
    const rect = e.target.getBoundingClientRect();
    // If not over a folder only show the top and bottom borders
    if (!this.props.isFolder) {
      // Get the Y midpoint of the element
      const midpoint = (rect.bottom - rect.top) / 2 + rect.top;
      // If the mouse Y pos is "higher" than the midpoint 
      //  and state needs to be refreshed:
      if (e.clientY < midpoint && this.state.drag !== "top") {
        this.setState({drag: "top"});
      // Else if lower and state needs to be refreshed:
      } else if (e.clientY > midpoint && this.state.drag !== "bottom") {
        this.setState({drag: "bottom"});
      }
    } else {
      // Get points for one quarter on the top and bottom and
      //  half in the middle (0.25 and 0.75 of height)
      const quarterHeight = (rect.bottom - rect.top) / 4;
      // With top-left coords point is 3 quarters from the top
      const bottomPoint = rect.top + 3 * quarterHeight;
      const topPoint = rect.top + quarterHeight;
      // Test mouse coords against heights and set state if new
      if (e.clientY < topPoint && this.state.drag !== "top") {
        this.setState({drag: "top"});
      } else if (e.clientY > bottomPoint && this.state.drag !== "bottom") {
        this.setState({drag: "bottom"});
      } else if (e.clientY >= topPoint && e.clientY <= bottomPoint &&
                     this.state.drag !== "middle") {
        this.setState({drag: "middle"});
      }
    }
  }

  // On drop method which forwards to Journal the path of the node (also
  //  the property name) and which direction the dropped item was nearest.
  onDrop = e => {
    e.stopPropagation();
    if (this.state.drag) {
      this.props.droppedOn(this.props.path, this.state.drag);
      this.setState({drag: null});
    }
  }

  // Stop propagation prevents multiple firings of the event and then the 
  //  drag property of state is reset
  onDragLeave = e => {
    e.stopPropagation();
    this.setState({drag: null});
  }

  render() {
    const props = this.props;
    return (
      // Drag events are registered on the overall container
      <div className="journaltreenode-container"
            draggable
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            onDragLeave={this.onDragLeave}>
        {/* Background highlights when dragged over the middle of a folder */}
        <div className={"journaltreenode-bg" + (this.state.drag === "middle" ?
                " journaltreenode-bg-hover" : "")}
             onClick={() => {
              props.toggleNode(props.path);
              if (!props.isFolder) props.openFile(props.path);
             }}>
          {/* The label is offset based on the indent and the border is applied 
          based on whether the top or bottom is closer to the drag point */}
          <div className={"journaltreenode-label no-select"
                                 + this.getBorderClass()} 
               style={{marginLeft: props.indent * 10 + "px"}}>
            <div className="journaltreenode-icon">
              {this.getIcon(props.isFolder, props.isOpen)}
            </div>
            <div>{props.title}</div>
          </div>
        </div>
        {/* Child nodes are displayed below enabling drap and drop of folder 
        structures, opening and closing of folders */}
        {props.isOpen ? props.getChildNodes(props.path).map(node => {
          if (node === undefined) return null;
          return (<JournalTreeNode {...node} key={node.path}
            getChildNodes={props.getChildNodes} 
            toggleNode={props.toggleNode}
            openFile={props.openFile}
            setDragged={props.setDragged}
            droppedOn={props.droppedOn} />
        )}) : null}
      </div>
    );
  }
}

export default JournalTreeNode;