import "./projectForm.css";
import createInputElement from "../inputContainer/inputElement";
// import createColorPickerButton from "../colorPickerContainer/colorPickerButton";
import createSwitchElement from "../switchContainer/switchElement";
import createButtonElement from "../buttonContainer/buttonElement";
import createProject from "../../eventHandlers/createProject";
import resetForm from "../../eventHandlers/resetForm";
import createClickableElement from "../clickableContainer/clickableElement";
import colorDialogue from "../colorDialogueContainer/colorDialogue";
import showModal from "../../eventHandlers/showModal";

const createFormElement = () => {
  const form = document.createElement("form");
  form.classList.add("project-form");
  form.addEventListener("submit", createProject);
  form.addEventListener("reset", resetForm);

  const colorContainer = document.createElement("div");
  const switchContainer = document.createElement("div");
  const buttonsContainer = document.createElement("div");

  colorContainer.classList.add("project-color-container");
  switchContainer.classList.add("project-switch-container");
  buttonsContainer.classList.add("project-button-container");

  const colorLabel = document.createElement("span");
  const switchLabel = document.createElement("span");

  colorLabel.textContent = "Color";
  switchLabel.textContent = "Add to favorites";

  const input = createInputElement("project name");
  const colorPicker = createClickableElement(
    "circle",
    "#696969",
    "Dim Gray",
    () => showModal(colorPicker, colorDialogue)
  );
  colorPicker.classList.add("color-picker");
  colorPicker.dataset.color = "#696969";
  colorPicker.dataset.label = "Dim Gray";
  colorPicker.children[0].classList.add("fill");

  const switchBtn = createSwitchElement();
  const cancelBtn = createButtonElement("cancel", "reset");
  const submitBtn = createButtonElement("add", "submit");

  colorContainer.append(colorLabel, colorPicker);
  switchContainer.append(switchBtn, switchLabel);
  buttonsContainer.append(cancelBtn, submitBtn);

  form.append(input, colorContainer, switchContainer, buttonsContainer);

  return form;
};

export default createFormElement;
