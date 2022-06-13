import { VscChevronRight } from "react-icons/vsc";
import React, { Component } from "react";
import "../StyleSheets/Pane.css";
import {
  addToProgress,
  addToDone,
  addToTodo,
  deleteNoteFromProgress,
  deleteNoteFromDone,
  getNotesOfDone,
  getNotesOfProgress,
  getNotesOfTodo,
  deleteNoteFromTodo,
} from "../Scripts/index.js";

// import "https://unicons.iconscout.com/release/v4.0.0/css/line.css"

class StickyNote extends Component {
  constructor(props) {
    super(props);
    this.noteMenuRef = React.createRef();
    this.sendMenuRef = React.createRef();
    this.state = {
      pane: this.props.pane,
      id: this.props.id,
    };
  }
  notesMenu = (event) => {
    event.preventDefault();
    let [x, y] = [event.clientX, event.clientY];
    this.noteMenuRef.current.style.left = `${x + 10}px`;
    this.noteMenuRef.current.style.top = `${y + 10}px`;
    this.noteMenuRef.current.classList.remove("invisible");
  };

  mouseLeftNote = () => {
    this.noteMenuRef.current.classList.add("invisible");
  };

  openSendMenu = () => {
    this.sendMenuRef.current.classList.remove("invisible");
  };

  mouseLeftSendButton = () => {
    this.sendMenuRef.current.classList.add("invisible");
  };

  todoClick = (event) => {
    addToTodo(this.state.id, this.state.pane);
    this.props.updateStateHandler();
  };

  inProgressClick = (event) => {
    addToProgress(this.state.id, this.state.pane);
    this.props.updateStateHandler();
  };

  doneClick = (event) => {
    addToDone(this.state.id, this.state.pane);
    this.props.updateStateHandler();
  };

  deleteNote = () => {
    if (!window.confirm("Are you sure you want to delete the task?")) return;
    this.deleteSwitch(this.state.id, this.state.pane);
    this.props.updateStateHandler();
  };

  deleteSwitch = (id, pane) => {
    switch (pane) {
      case "todo":
        let notesList1 = getNotesOfTodo();
        notesList1.splice(id, 1);
        deleteNoteFromTodo(notesList1);
        break;
      case "inprogress":
        let notesList2 = getNotesOfProgress();
        notesList2.splice(id, 1);
        deleteNoteFromProgress(notesList2);
        break;
      default:
        let notesList3 = getNotesOfDone();
        notesList3.splice(id, 1);
        deleteNoteFromDone(notesList3);
    }
  };

  render() {
    const { title, desc } = this.props;

    const customSwitch = (p) => {
      switch (p) {
        case "todo":
          return (
            <ul>
              <li id="todo" className="disabled_button">
                Todo
              </li>
              <li
                id="inprogress"
                className="point"
                onClick={this.inProgressClick}
              >
                In Progress
              </li>
              <li id="done" className="point" onClick={this.doneClick}>
                Done
              </li>
            </ul>
          );
        case "inprogress":
          return (
            <ul>
              <li id="todo" className="point" onClick={this.todoClick}>
                Todo
              </li>
              <li id="inprogress" className="disabled_button">
                In Progress
              </li>
              <li id="done" className="point" onClick={this.doneClick}>
                Done
              </li>
            </ul>
          );
        default:
          return (
            <ul>
              <li id="todo" className="point" onClick={this.todoClick}>
                Todo
              </li>
              <li
                id="inprogress"
                className="point"
                onClick={this.inProgressClick}
              >
                In Progress
              </li>
              <li id="done" className="disabled_button">
                Done
              </li>
            </ul>
          );
      }
    };

    return (
      <div
        className="stickyNote"
        onContextMenu={this.notesMenu}
        onMouseLeave={this.mouseLeftNote}
      >
        <h4 name="title">{title}</h4>
        <textarea
          name="description"
          className="notes"
          id="desc"
          readOnly
          value={desc}
        ></textarea>
        <div className="notesMenu invisible trans" ref={this.noteMenuRef}>
          <ul>
            <li
              onMouseEnter={this.openSendMenu}
              onMouseLeave={this.mouseLeftSendButton}
            >
              <div className="sendOption">
                <span>Send to</span>
                <VscChevronRight />
              </div>
              <div className="sendMenu invisible trans" ref={this.sendMenuRef}>
                {customSwitch(this.state.pane)}
              </div>
            </li>
            <li onClick={this.deleteNote}>Delete</li>
            <li>Archive</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StickyNote;
