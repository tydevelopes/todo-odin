import createFormElement from "../components/projectFormContainer/projectForm";
import {
  deleteProjectInProjectList,
  deleteProject,
  readDb
} from "../dataModel/databases/crud";
import showModal from "./showModal";
import createProjectElement from "../components/projectContainer/projectElement";
import { renderFavoriteAndProjectList } from "../helperFunctions/utilities";

export const openProjectFormForEdit = (e) => {
  console.log("project form opened for editing");

  // get project info
  const { name, color, colorName, favorite } = JSON.parse(
    document.querySelector(".project-head").dataset.object
  );
  const form = createFormElement();
  form.dataset.action = "edit";
  form.dataset.projectid = document.querySelector(".project-head").dataset.id;
  const input = form.querySelector("form > input");
  input.value = name;
  const colorPicker = form.querySelector(".color-picker");
  colorPicker.dataset.color = color;
  colorPicker.dataset.label = colorName;
  colorPicker.children[0].style.color = color;
  colorPicker.children[1].textContent = colorName;
  const switchLabel = form.querySelector(".switch-wrapper");
  switchLabel.dataset.switched = favorite;
  switchLabel.style.backgroundColor = favorite === "true" ? "#22c55e" : "";

  showModal(e.currentTarget, form);
};
export const openSectionForm = () => {
  console.log("section form opened");
};
export const showCompletedTaskForProject = () => {
  console.log("show completed task");
};
export const archiveProject = () => {
  console.log("project archived");
};
export const removeProject = () => {
  console.log("project deleted");
  const main = document.querySelector(".main");
  const projectId = document.querySelector(".project-head").dataset.id;
  deleteProject(projectId);
  deleteProjectInProjectList(projectId);
  // render inbox page
  const inbox = readDb("inbox");
  const inboxPage = createProjectElement(inbox);

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  main.append(inboxPage);
  renderFavoriteAndProjectList();
};
