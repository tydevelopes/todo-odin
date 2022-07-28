import "./projectElement.css";
import createClickableElement from "../clickableContainer/clickableElement";
import createTaskElement from "../taskContainer/taskElement";
import createSectionElement from "../sectionContainer/sectionElement";
import showModal from "../../eventHandlers/showModal";
import projectDialogue from "../projectDialogueContainer/projectDialogue";
import { openTaskFormUnderProject } from "../../eventHandlers/openCloseTaskForm";
import { openSectionForm } from "../../eventHandlers/openCloseSectionForm";

const createProjectElement = (project) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-wrapper");
  wrapper.dataset.idpath = project.id;
  wrapper.dataset.namepath = project.name;
  wrapper.dataset.path = "project";

  const projectHead = document.createElement("div");
  projectHead.classList.add("project-head");
  projectHead.dataset.id = project.id;

  const colorObj = {
    "#FA8072": "Salmon",
    "#696969": "Dim Gray",
    "#FFA07A": "Light Salmon",
    "#FF69B4": "Hot Pink",
    "#FF6347": "Tomato",
    "#FFD700": "Gold",
    "#FF00FF": "Magenta",
    "#8A2BE2": "Blue Voilet",
    "#6A5ACD": "Slate Blue",
    "#7FFF00": "Chartreuse",
    "#008080": "Teal",
    "#708090": "Slate Gray",
    gray: "Gray"
  };

  projectHead.dataset.object = JSON.stringify({
    name: project.name,
    color: project.color,
    favorite: project.favorite,
    id: project.id,
    colorName: colorObj[project.color]
  });

  const projectName = createClickableElement(
    null,
    null,
    project.name,
    null,
    null
  );
  projectName.classList.add("project-name");

  const moreProjectIcon = createClickableElement(
    "more_horiz",
    null,
    null,
    () => showModal(moreProjectIcon, projectDialogue),
    "More project actions"
  );

  const addTaskIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add task",
    openTaskFormUnderProject
  );
  const addSectionIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add section",
    openSectionForm
  );
  addSectionIcon.classList.add("add-section");

  // const addSectionIcon2 = createClickableElement(
  //   "add",
  //   "#ff7066",
  //   "Add section",
  //   openSectionForm
  // );

  projectHead.append(projectName, moreProjectIcon);
  wrapper.append(projectHead);

  if (project.tasks.length) {
    project.tasks.forEach((task) => {
      let taskElement = createTaskElement(
        { namePath: project.name, idPath: project.id, path: "project" },
        task
      );
      wrapper.append(taskElement);
    });
  }

  wrapper.append(addTaskIcon);
  // wrapper.append(addSectionIcon);

  if (project.sections.length) {
    project.sections.forEach((section) => {
      let sectionElement = createSectionElement(
        { namePath: project.name, idPath: project.id, path: "project" },
        section
      );
      wrapper.append(sectionElement);
    });
  }

  wrapper.append(addSectionIcon);

  return wrapper;
};

export default createProjectElement;
