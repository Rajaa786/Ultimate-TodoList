import React, { Component } from "react";
import { saveInTodo } from "../Scripts/index.js";
import "../StyleSheets/Modal.css";

class Modal extends Component {

  submit = (event) => {
    event.preventDefault();
    let noteObj = {};
    noteObj.title = event.target.querySelector("#title").value;
    noteObj.desc = event.target.querySelector("#desc").value;
    console.log(noteObj);
    saveInTodo(noteObj);
    this.props.updateStateHandler();
    this.props.modalClose();
  };

  render() {
    return (
      <div>
        <div className="modalBack">
          <form onSubmit={this.submit} className="formm">
            <div className="labelInputDiv">
              <label htmlFor="title">Title : </label>
              <input className="inputElement"
                id="title"
                type="text"
                placeholder="Specify the title of the note"
              />
            </div>
            <div className="labelInputDiv">
              <label htmlFor="desc">Description :</label>
              <textarea
                name=""
                id="desc"
                rows="5"
                placeholder="Note Description"
              ></textarea>
            </div>
            <div className="btnGroup">
              <button onClick={this.closeModal}>Cancel</button>
              <button type="submit">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
