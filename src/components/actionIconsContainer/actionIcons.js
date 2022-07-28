import createClickableElement from "../clickableContainer/clickableElement";
import renderTodayView from "../../eventHandlers/renderTodayView";
import openAnalyticsDialogue from "../../eventHandlers/openAnalyticsDialogue";
import toggleDarkMode from "../../eventHandlers/toggleDarkMode";
import showModal from "../../eventHandlers/showModal";
import createTaskForm from "../taskFormContainer/taskForm";
import createTaskUnderProject from "../../eventHandlers/createTaskUnderProject";
import closeFormModal from "../../eventHandlers/closeModal";

export const homeIcon = createClickableElement(
  "home",
  "",
  null,
  renderTodayView,
  "Go to home"
);

const openFormModal = () => {
  const form = createTaskForm({
    createTask: createTaskUnderProject,
    closeForm: closeFormModal
  });
  showModal(addTaskIcon, form);
  form.parentElement.dataset.idpath = document.querySelector(
    ".project-wrapper"
  ).dataset.idpath;
  form.parentElement.dataset.targetparentid = "";
};

export const addTaskIcon = createClickableElement(
  "add",
  "",
  null,
  openFormModal,
  "Add task"
);
export const analyticsIcon = createClickableElement(
  "analytics",
  "",
  null,
  openAnalyticsDialogue,
  "Open analytics"
);

export const themeIcon = createClickableElement(
  "dark_mode",
  "",
  null,
  toggleDarkMode,
  "Toggle theme"
);
