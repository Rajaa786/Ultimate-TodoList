import React, { Component } from "react";
import "../StyleSheets/navbar.css";
import "../StyleSheets/Pane.css";
import Modal from "./Modal";
import StickyNote from "./StickyNote";
import {
  getNotesOfTodo,
  getNotesOfProgress,
  getNotesOfDone,
} from "../Scripts/index.js";

class WordBoard extends Component {
  constructor(props) {
    super(props);
    this.todoRef = React.createRef();
    this.state = {
      searchBarInput: "",
      setModal: false,
      todoNotes: [],
      progressNotes: [],
      doneNotes: [],
    };
  }

  componentDidMount = () => {
      this.setState({
        todoNotes: getNotesOfTodo(),
        progressNotes: getNotesOfProgress(),
        doneNotes: getNotesOfDone(),
      });
  };

  searchChangeHandler = (event) => {
    this.setState(
      {
        searchBarInput: event.target.value,
      },
      () => {
        let newtodoNotes = getNotesOfTodo().filter((note) => {
          return note.title
            .toLowerCase()
            .includes(this.state.searchBarInput.toLowerCase());
        });
        let newprogressNotes = getNotesOfProgress().filter((note) => {
          return note.title
            .toLowerCase()
            .includes(this.state.searchBarInput.toLowerCase());
        });
        let newdoneNotes = getNotesOfDone().filter((note) => {
          return note.title
            .toLowerCase()
            .includes(this.state.searchBarInput.toLowerCase());
        });
        this.setState({
          todoNotes: newtodoNotes,
          progressNotes: newprogressNotes,
          doneNotes: newdoneNotes,
        });
      }
    );

    
  };
  mouseLeftTodo = () => {
    this.todoRef.current.classList.add("invisible");
  };

  todoPaneMenu = (event) => {
    event.preventDefault();
    let [x, y] = [event.clientX, event.clientY];
    this.todoRef.current.style.left = `${x + 10}px`;
    this.todoRef.current.style.top = `${y + 10}px`;
    this.todoRef.current.classList.remove("invisible");
  };

  openModal = (event) => {
    event.target.classList.remove("trans");
    this.setState({ setModal: true });
  };

  closeModal = (event) => {
    this.setState({ setModal: false });
  };

  updateState = () => {
    this.setState({
      todoNotes: getNotesOfTodo(),
      progressNotes: getNotesOfProgress(),
      doneNotes: getNotesOfDone(),
    });
  };

  render() {
    return (
      <div>
        <div className="nav">
          <div className="navElements">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </div>
          <div className="search">
            <input
              className="searchInput"
              type="text"
              placeholder="Search..."
              onChange={this.searchChangeHandler}
            />
          </div>
        </div>
        <div className="container">
          <div className="pane">
            <div
              className="pane_name"
              onContextMenu={this.todoPaneMenu}
              onMouseLeave={this.mouseLeftTodo}
            >
              Todo Pane
              <div
                className="invisible trans inline"
                ref={this.todoRef}
                onClick={this.openModal}
              >
                New Task
              </div>
            </div>

            <div className="notes_container">
              {this.state.todoNotes.map((note, index) => {
                return (
                  <StickyNote
                    updateStateHandler={this.updateState}
                    key={index}
                    id={index}
                    title={note.title}
                    desc={note.desc}
                    pane="todo"
                  />
                );
              })}
            </div>
          </div>
          <div className="pane">
            <div className="pane_name">In Progress</div>
            <div className="notes_container">
              {this.state.progressNotes.map((note, index) => {
                return (
                  <StickyNote
                    updateStateHandler={this.updateState}
                    key={index}
                    id={index}
                    title={note.title}
                    desc={note.desc}
                    pane="inprogress"
                  />
                );
              })}
            </div>
          </div>
          <div className="pane">
            <div className="pane_name">Done</div>
            <div className="notes_container">
              {this.state.doneNotes.map((note, index) => {
                return (
                  <StickyNote
                    updateStateHandler={this.updateState}
                    key={index}
                    id={index}
                    title={note.title}
                    desc={note.desc}
                    pane="done"
                  />
                );
              })}
            </div>
          </div>
          {this.state.setModal && (
            <Modal
              modalClose={this.closeModal}
              updateStateHandler={this.updateState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WordBoard;
