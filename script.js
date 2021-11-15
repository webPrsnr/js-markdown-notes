class Markdown {
  constructor(text) {
    this.text = this.checkText();
    this.noteForm;
    this.updateNotes();
  }
  checkText() {
    return `Enter something here. Just click to edit. \nClick submit icon to save. \nClick delete icon to delete.
    `;
  }
  getCurrentDay() {
    return new Date().toUTCString();
  }

  updateNotes() {
    this.renderNoteElement(document.querySelector(".wrapper"));
  }

  renderNoteElement(htmlEl) {
    this.noteForm = makeHtmlDiv(htmlEl, "notes-form");
    let formText = makeHtmlDiv(this.noteForm, "form-text");
    formText.textContent = this.text;
    formText.setAttribute("tabindex", "0");
    let formPanel = makeHtmlDiv(this.noteForm, "form-panel");
    let formTime = makeHtmlDiv(formPanel, "form-time");
    let formController = makeHtmlDiv(formPanel, "form-controller");
    let formStatus = makeHtmlDiv(formController, "status");
    let formDelete = makeHtmlDiv(formController, "delete");

    let noteCheck = false;

    formTime.textContent = this.getCurrentDay();

    formText.onfocus = function () {
      changeText(formText);
    };

    formStatus.addEventListener("click", () => {
      changeText(formText);
    });

    formDelete.addEventListener("click", () => {
      this.noteForm.remove();
    });
    function changeText(noteNode) {
      if (noteCheck == false) {
        noteCheck = true;
        createTextarea(noteNode);
      } else if (noteCheck == true) {
        noteCheck = false;
        noteNode.textContent = noteNode.childNodes[0].value;
      }
    }
    function makeHtmlDiv(htmlEl, className) {
      const div = document.createElement("div");
      div.className = className;
      htmlEl.append(div);
      return div;
    }

    function createTextarea(noteNode) {
      const textArea = document.createElement("textarea");
      textArea.name = "noteText";
      textArea.rows = noteNode.textContent.split("\n").length * 1.5;
      textArea.textContent = noteNode.textContent;
      noteNode.textContent = null;
      noteNode.append(textArea);
    }
  }
}

document.querySelector(".btn-add").addEventListener("click", () => {
  new Markdown();
});
