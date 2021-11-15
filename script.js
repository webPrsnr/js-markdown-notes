class Markdown {
  constructor() {
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
    this.noteForm = _makeHtmlDiv(htmlEl, "notes-form");
    const formText = _makeHtmlDiv(this.noteForm, "form-text");
    formText.textContent = this.checkText();
    formText.setAttribute("tabindex", "0");
    const formPanel = _makeHtmlDiv(this.noteForm, "form-panel");
    const formTime = _makeHtmlDiv(formPanel, "form-time");
    const formController = _makeHtmlDiv(formPanel, "form-controller");
    const formStatus = _makeHtmlDiv(formController, "status");
    const formDelete = _makeHtmlDiv(formController, "delete");

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
    });
    function _changeText(noteNode) {
      if (noteCheck == false) {
        noteCheck = true;
        _createTextarea(noteNode);
      } else if (noteCheck == true) {
        noteCheck = false;
        noteNode.textContent = noteNode.childNodes[0].value;
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

document.querySelector(".btn-add").addEventListener("click", () => {
  new Markdown();
});
