class Markdown {
  constructor(text) {
    this.text = this.checkText();
    this.noteForm;
    this.updateNotes();
    this.noteCheck = false;
  }
  checkText() {
    return ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus mi turpis, dapibus ornare ligula hendrerit vulputate. Phasellus nec porttitor dui. Pellentesque vel metus at nibh ornare sagittis consectetur quis neque. Suspendisse facilisis, leo vel scelerisque hendrerit, magna ipsum blandit lorem, sit amet euismod ligula felis ut nisl. Fusce tempus convallis elit. Donec in elit aliquet, lobortis est elementum, suscipit purus. Duis consectetur suscipit ex nec lobortis. Praesent cursus sapien nulla, vitae volutpat dolor pretium ut. Pellentesque varius libero a purus efficitur commodo. Curabitur tristique elementum sapien, a faucibus elit elementum eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus gravida, mauris vel dictum pellentesque, leo sapien consequat arcu, in dapibus arcu odio id eros. Pellentesque eleifend aliquet feugiat. Phasellus placerat risus in tellus scelerisque semper. Donec condimentum pulvinar rhoncus. Mauris ac ante vel elit posuere tristique id vitae urna. 
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
        const textArea = document.createElement("textarea");
        textArea.name = "noteText";
        textArea.textContent = noteNode.textContent;
        noteNode.textContent = null;
        noteNode.append(textArea);
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
  }
}

document.querySelector(".btn-add").addEventListener("click", () => {
  new Markdown();
});
