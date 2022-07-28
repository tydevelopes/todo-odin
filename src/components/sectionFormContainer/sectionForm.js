import "./sectionForm.css";
import createInputElement from "../inputContainer/inputElement";
import createButtonElement from "../buttonContainer/buttonElement";

const createSectionForm = ({ createSection, closeForm }) => {
  const form = document.createElement("form");
  form.classList.add("section-form");
  form.addEventListener("submit", createSection);
  form.addEventListener("reset", closeForm);

  const input = createInputElement("section name");
  const cancelBtn = createButtonElement("cancel", "reset");
  const submitBtn = createButtonElement("add section", "submit");

  input.classList.add("section-name");

  const buttonsContainer = document.createElement("div");

  buttonsContainer.classList.add("section-button-container");

  buttonsContainer.append(submitBtn, cancelBtn);

  form.append(input, buttonsContainer);

  return form;
};

export default createSectionForm;
