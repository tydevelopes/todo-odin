import "./projectList.css";
import createClickableElement from "../clickableContainer/clickableElement";
import toggleCollapse from "../../eventHandlers/toggleCollapse";
import showModal from "../../eventHandlers/showModal";
import createFormElement from "../projectFormContainer/projectForm";
import renderProjectPage from "../../eventHandlers/renderProjectPage";

const createProjectList = (projects) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-list-wrapper");

  const projectListHead = document.createElement("div");
  projectListHead.classList.add("project-list-head");

  let icon = projects?.collapsed ? "chevron_right" : "expand_more";
  const collapsibleIcon = createClickableElement(
    icon,
    null,
    "Projects",
    toggleCollapse
  );

  const form = createFormElement();
  form.dataset.action = "add";
  const addProjectIcon = createClickableElement(
    "add",
    null,
    null,
    () => showModal(addProjectIcon, form),
    "Add Project"
  );

  projectListHead.append(collapsibleIcon, addProjectIcon);

  wrapper.append(projectListHead);

  projects?.projectList.forEach((project) => {
    let projectElement = createClickableElement(
      "circle",
      project.color,
      project.name,
      renderProjectPage,
      null,
      project.numOfTasks
    );
    projectElement.dataset.id = project.id;
    projectElement.classList.add("project-item");
    projectElement.children[0].classList.add("fill");
    wrapper.append(projectElement);
  });

  return wrapper;
};

export default createProjectList;
