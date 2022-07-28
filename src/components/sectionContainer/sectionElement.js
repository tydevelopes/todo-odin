import "./sectionElement.css";
import createClickableElement from "../clickableContainer/clickableElement";
import toggleCollapse from "../../eventHandlers/toggleCollapse";
import createTaskElement from "../taskContainer/taskElement";
import showModal from "../../eventHandlers/showModal";
import sectionDialogue from "../sectionDialogueContainer/sectionDialogue";
import { openTaskFormUnderSection } from "../../eventHandlers/openCloseTaskForm";
import { countTasks } from "../../helperFunctions/utilities";

const createSectionElement = (parent, section) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("section-wrapper");
  wrapper.dataset.namepath = `${parent.namePath}/${section.name}`;
  wrapper.dataset.idpath = `${parent.idPath}/${section.id}`;
  wrapper.dataset.path = `${parent.path}/section`;

  const sectionHead = document.createElement("div");
  sectionHead.classList.add("section-head");
  sectionHead.dataset.id = section.id;
  sectionHead.dataset.name = section.name;

  let icon = section.collapsed ? "chevron_right" : "expand_more";
  const collapsibleIcon = createClickableElement(
    icon,
    null,
    null,
    toggleCollapse
  );

  const sectionName = createClickableElement(
    null,
    null,
    section.name,
    null,
    null,
    countTasks(section.tasks)
  );
  sectionName.classList.add("section-name");

  const moreSectionIcon = createClickableElement(
    "more_horiz",
    null,
    null,
    () => showModal(moreSectionIcon, sectionDialogue),
    "More section actions"
  );

  sectionHead.append(collapsibleIcon, sectionName, moreSectionIcon);

  wrapper.append(sectionHead);

  if (section.tasks.length) {
    section.tasks.forEach((task) => {
      let taskParent = {
        namePath: `${parent.namePath}/${section.name}`,
        idPath: `${parent.idPath}/${section.id}`,
        path: `${parent.path}/section`
      };
      let taskElement = createTaskElement(taskParent, task);

      wrapper.append(taskElement);
    });
  }

  const addTaskIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add task",
    openTaskFormUnderSection
  );

  wrapper.append(addTaskIcon);

  return wrapper;
};

export default createSectionElement;
