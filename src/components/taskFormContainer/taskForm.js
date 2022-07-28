import "./taskForm.css";
import createInputElement from "../inputContainer/inputElement";
import createButtonElement from "../buttonContainer/buttonElement";
import createClickableElement from "../clickableContainer/clickableElement";
import createDatePicker from "../datePickerContainer/datePickerElement";
import priorityDialogue from "../priorityDialogueContainer/priorityDialogue";
import showModal from "../../eventHandlers/showModal";
import selectDate from "../../eventHandlers/selectDate";
// import { closeTaskForm } from "../../eventHandlers/openCloseTaskForm";
// import createTaskUnderSection from "../../eventHandlers/createTaskUnderSection";

const createTaskForm = ({ createTask, closeForm }) => {
  const form = document.createElement("form");
  form.classList.add("task-form");
  // if (!parent || parent?.classList.contains("project-wrapper")) {
  //   form.addEventListener("submit", createTask);
  // }
  // if (parent?.classList.contains("section-wrapper")) {
  // }
  form.addEventListener("submit", createTask);
  form.addEventListener("reset", closeForm);

  const taskName = createInputElement("Task name");
  const taskDesc = createInputElement("Description");
  const cancelBtn = createButtonElement("cancel", "reset");
  const submitBtn = createButtonElement("Add task", "submit");

  taskName.classList.add("task-name");
  taskDesc.classList.add("task-description");

  const dateForm = createDatePicker();
  dateForm.addEventListener("submit", selectDate);
  const date = createClickableElement("event", "", "Due date", () =>
    showModal(date, dateForm)
  );
  const priority = createClickableElement(
    "label_important",
    "",
    null,
    () => showModal(priority, priorityDialogue),
    "Set priority",
    null
  );

  priority.classList.add("priority-picker");
  priority.dataset.color = "#FF7066";
  priority.dataset.label = "priority-4";
  priority.children[0].classList.add("fill");

  date.classList.add("task-date-picker");
  date.dataset.date = "";

  const wrapper = document.createElement("div");
  wrapper.classList.add("date-priority-wrapper");
  wrapper.append(date, priority);

  const buttonsContainer = document.createElement("div");

  buttonsContainer.classList.add("task-button-container");

  buttonsContainer.append(submitBtn, cancelBtn);

  form.append(taskName, taskDesc, wrapper, buttonsContainer);

  return form;
};

export default createTaskForm;
