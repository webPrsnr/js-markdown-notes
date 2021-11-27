const md = window.markdownit();

class Markdown {
  constructor(id, text, time) {
    this.noteForm;
    this.noteId = id;
    this.noteText = text;
    this.noteTime = time;
    this.updateNotes();
  }

  checkText() {
    if (this.noteText) {
      return this.noteText;
    }
    return md.render(`# Enter something here. Just click to edit. \nClick submit icon to save. \nClick delete icon to delete.
    `);
  }
  getCurrentDay() {
    if (this.noteTime) {
      return this.noteTime;
    }
    return new Date().toUTCString();
  }

  updateNotes() {
    this.renderNoteElement(document.querySelector(".wrapper"));
  }

  renderNoteElement(htmlEl) {
    this.noteForm = _makeHtmlDiv(htmlEl, "notes-form");
    const formText = _makeHtmlDiv(this.noteForm, "form-text");
    formText.textContent = this.checkText();
    formText.setAttribute("tabindex", "0");
    const formPanel = _makeHtmlDiv(this.noteForm, "form-panel");
    const formTime = _makeHtmlDiv(formPanel, "form-time");
    const formController = _makeHtmlDiv(formPanel, "form-controller");
    const formStatus = _makeHtmlDiv(formController, "status");
    const formDelete = _makeHtmlDiv(formController, "delete");

    let id = this.noteId;

    let noteCheck = false;

    formTime.textContent = this.getCurrentDay();

    formText.onfocus = function () {
      _changeText(formText);
    };

    formStatus.addEventListener("click", () => {
      _changeText(formText);
    });

    formDelete.addEventListener("click", () => {
      this.noteForm.remove();
      rmvNoteFromLocalStorage(id);
    });
    function _changeText(noteNode) {
      if (noteCheck == false) {
        noteCheck = true;
        _createTextarea(noteNode);
      } else if (noteCheck == true) {
        noteCheck = false;
        noteNode.textContent = noteNode.childNodes[0].value;
        id = addNoteToLocalStorage(noteNode.textContent, formTime.textContent);
      }
    }
    function _makeHtmlDiv(htmlEl, className) {
      const div = document.createElement("div");
      div.className = className;
      htmlEl.append(div);
      return div;
    }

    function _createTextarea(noteNode) {
      const textArea = document.createElement("textarea");
      textArea.name = "noteText";
      textArea.rows = noteNode.textContent.split("\n").length * 1.5;
      textArea.textContent = noteNode.textContent;
      noteNode.textContent = null;
      noteNode.append(textArea);
    }
  }
}

const LOCAL_STORAGE_STRING = "notes";

function getLocalStorageNotes() {
  const notes =
    localStorage.getItem(LOCAL_STORAGE_STRING) !== null
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_STRING))
      : [];
  return notes;
}

function setLocalStorageNotes(note) {
  let notes = getLocalStorageNotes();
  notes.push(note);
  localStorage.setItem(LOCAL_STORAGE_STRING, JSON.stringify(notes));
}

function addNoteToLocalStorage(text, time) {
  const notes = getLocalStorageNotes();
  const newNote = {
    id: notes.length == 0 ? 1 : notes[notes.length - 1].id + 1,
    text: text,
    time: time,
  };
  setLocalStorageNotes(newNote);
  return newNote.id;
}

function rmvNoteFromLocalStorage(id) {
  const notes = getLocalStorageNotes();
  localStorage.clear();
  notes
    .filter((note) => note.id !== parseInt(id))
    .map((el) => setLocalStorageNotes(el));
}

function preRenderAllNotes() {
  let notes = getLocalStorageNotes();
  notes.map((el) => new Markdown(el.id, el.text, el.time));
}

preRenderAllNotes();
document.querySelector(".btn-add").addEventListener("click", () => {
  new Markdown();
});
