class Markdown {
  constructor(text) {
    this.text = this.checkText();
    this.time = this.getCurrentDay();
    this.noteForm;
    this.updateNotes();
  }
  checkText() {
    return "Enter something here...";
  }
  getCurrentDay() {
    return new Date().toUTCString();
  }

  updateNotes() {
    this.noteForm = this.renderNoteElement(document.querySelector(".wrapper"));
  }

  renderNoteElement(htmlEl) {
    let form = makeHtmlDiv(htmlEl, "notes-form");
    let formText = makeHtmlDiv(form, "form-text");
    formText.textContent = this.text;
    let formPanel = makeHtmlDiv(form, "form-panel");
    let formTime = makeHtmlDiv(formPanel, "form-time");
    let formController = makeHtmlDiv(formPanel, "form-controller");
    let formStatus = makeHtmlDiv(formController, "status");
    let formDelete = makeHtmlDiv(formController, "delete");

    function makeHtmlDiv(htmlEl, className) {
      const div = document.createElement("div");
      div.className = className;
      htmlEl.append(div);
      return div;
    }
  }
}

document.querySelector(".btn-add").addEventListener("click", () => {
  return new Markdown();
});
