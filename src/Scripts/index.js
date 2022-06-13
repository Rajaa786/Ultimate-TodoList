const updateSwitch = (p , id , listOfNotes) => {
  switch (p) {
    case "todo":
      return deleteNoteFromTodo(listOfNotes);
    case "inprogress":
      return deleteNoteFromProgress(listOfNotes);
    default:
      return deleteNoteFromDone(listOfNotes);
  }
}


const customSwitch = (p) => {
  switch (p) {
    case "todo":
      return getNotesOfTodo();
    case "inprogress":
      return getNotesOfProgress();
    default:
      return getNotesOfDone();
  }
};

const saveSwitch = (p, note) => {
  switch (p) {
    case "todo":
      return saveInTodo(note);
    case "inprogress":
      return saveInProgress(note);
    default:
      return saveInDone(note);
  }
};

export const deleteNoteFromTodo = (notesList) => {
  localStorage.setItem("todo", JSON.stringify(notesList));
}

export const deleteNoteFromProgress = (notesList) => {
  localStorage.setItem("inprogress", JSON.stringify(notesList));
}

export const deleteNoteFromDone = (notesList) => {
  localStorage.setItem("done", JSON.stringify(notesList));
}

export const saveInTodo = (noteObject) => {
  let todoList = getNotesOfTodo();
  todoList.push(noteObject);
  localStorage.setItem("todo", JSON.stringify(todoList));
};

export const saveInProgress = (noteObject) => {
  let progressList = getNotesOfProgress();
  progressList.push(noteObject);
  localStorage.setItem("inprogress", JSON.stringify(progressList));
  console.log("Saved in Progress "+noteObject);
};

export const saveInDone = (noteObject) => {
  let doneList = getNotesOfDone();
  doneList.push(noteObject);
  localStorage.setItem("done", JSON.stringify(doneList));
  console.log("Saved in Done "+noteObject);
};

export const getNotesOfTodo = () => {
  return JSON.parse(localStorage.getItem("todo")) || [];
};

export const getNotesOfProgress = () => {
  return JSON.parse(localStorage.getItem("inprogress")) || [];
};

export const getNotesOfDone = () => {
  return JSON.parse(localStorage.getItem("done")) || [];
};

export const addToProgress = (id, pane) => {
  let noteList = customSwitch(pane);
  let noteObj = noteList[id];
  noteList.splice(id,1);
  updateSwitch(pane , id , noteList);
  saveSwitch("inprogress",noteObj);
};

export const addToDone = (id, pane) => {
  let noteList = customSwitch(pane);
  let noteObj = noteList[id];
  noteList.splice(id,1);
  updateSwitch(pane , id , noteList);

  saveSwitch("done",noteObj);
};

export const addToTodo = (id, pane) => {
  let noteList = customSwitch(pane);
  let noteObj = noteList[id];
  noteList.splice(id,1);
  updateSwitch(pane , id , noteList);
  saveSwitch("todo",noteObj);
};
