const md = window.markdownit();

class Markdown {
  constructor(markdownDB, markdownRender, id, text, time) {
    this.markdownRender = markdownRender;
    this.markdownDB = markdownDB;
    this.noteForm;
    this.noteId = id;
    this.noteText = text;
    this.noteTime = time;
    this.noteAddBtn = document.querySelector(".btn-add");
    this.updateNotes();
  }

  checkText() {
    if (this.noteText) {
      return this.noteText;
    }
    return `# Enter something here. Just click to edit. \n## Click submit icon to save. \n## Click delete icon to delete.
    `;
  }
  getCurrentDay() {
    if (this.noteTime) {
      return this.noteTime;
    }
    return new Date().toUTCString();
  }

  updateNotes() {
    this.markdownRender.markdownText = this.checkText();
    this.markdownRender.formText.innerHTML = md.render(this.checkText());

    this.markdownRender.formTime.textContent = this.getCurrentDay();

    this.markdownRender.formText.onfocus = () => {
      this.markdownRender.changeText(this.markdownRender.formText);
    };

    this.markdownRender.formStatus.addEventListener("click", () => {
      let noteNode = this.markdownRender.changeText(
        this.markdownRender.formText
      );
      this.noteId = this.markdownDB.addNoteToLocalStorage(
        this.markdownRender.markdownText,
        this.markdownRender.formTime.textContent,
        this.noteId
      );
    });

    this.markdownRender.formDelete.addEventListener("click", () => {
      this.markdownRender.noteForm.remove();
      this.markdownDB.rmvNoteFromLocalStorageNotes(this.noteId);
    });
  }
}

class MarkdownRender {
  constructor(htmlEl) {
    this.noteForm = this.makeHtmlDiv(htmlEl, "notes-form");
    this.formText = this.makeHtmlDiv(this.noteForm, "form-text");
    this.formText.innerHTML = `# Enter something here. Just click to edit. \n## Click submit icon to save. \n## Click delete icon to delete.
    `;
    this.formText.setAttribute("tabindex", "0");
    this.formPanel = this.makeHtmlDiv(this.noteForm, "form-panel");
    this.formTime = this.makeHtmlDiv(this.formPanel, "form-time");
    this.formController = this.makeHtmlDiv(this.formPanel, "form-controller");
    this.formStatus = this.makeHtmlDiv(this.formController, "status");
    this.formDelete = this.makeHtmlDiv(this.formController, "delete");
    this.noteCheck = false;
    this.markdownText;
  }
  makeHtmlDiv(htmlEl, className) {
    const div = document.createElement("div");
    div.className = className;
    htmlEl.append(div);
    return div;
  }

  createTextarea(noteNode) {
    const textArea = document.createElement("textarea");
    textArea.name = "noteText";
    textArea.rows = noteNode.textContent.split("\n").length * 1.5;
    textArea.textContent = this.markdownText;
    noteNode.textContent = null;

    noteNode.append(textArea);
  }

  changeText(noteNode) {
    if (this.noteCheck == false) {
      this.noteCheck = true;
      this.createTextarea(noteNode);
    } else {
      this.noteCheck = false;
      this.markdownText = noteNode.childNodes[0].value;
      noteNode.innerHTML = md.render(noteNode.childNodes[0].value);
    }
    return noteNode;
  }
}

class MarkdownDB {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
  }

  setLocalStorageNotes(note) {
    this.notes.push(note);
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  addNoteToLocalStorage(text, time, id) {
    if (id) {
      this.rmvNoteFromLocalStorageNotes(id);
    }
    const note = {
      id: id
        ? id
        : this.notes.length == 0
        ? 1
        : this.notes[this.notes.length - 1].id + 1,
      text: text,
      time: time,
    };
    this.setLocalStorageNotes(note);
    return note.id;
  }

  rmvNoteFromLocalStorageNotes(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
}

(function preRender() {
  notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) {
    notes.map((note) => {
      new Markdown(
        new MarkdownDB(),
        new MarkdownRender(document.querySelector(".wrapper")),
        note.id,
        note.text,
        note.time
      );
    });
  }
})();

document.querySelector(".btn-add").addEventListener("click", () => {
  //debugger;
  new Markdown(
    new MarkdownDB(),
    new MarkdownRender(document.querySelector(".wrapper"))
  );
});
