import createTaskForm from "../components/taskFormContainer/taskForm";
import closeForm from "./closeForm";
import createTask from "./createTask";
import createTaskUnderProject from "./createTaskUnderProject";
import createTaskUnderSection from "./createTaskUnderSection";
import {
  updateProjectTasksCountInProjectList,
  saveTaskInProject,
  saveTaskInProjectSection,
  readDb
} from "../dataModel/databases/crud";
import {
  cloneDeep,
  renderFavoriteAndProjectList,
  renderProjectPage,
  totalProjectTasks
} from "../helperFunctions/utilities";
import showmodal from "./showModal";
import createProjectAndSectionListDialogue from "../components/projectsAndSectionsDialogueContainer/projectsAndSectionsDialogue";

const insertElement = (e, where) => {
  const modalContainer =
    e.currentTarget.parentElement.parentElement.parentElement;
  const id = modalContainer.dataset.targetparentid;
  const parentTarget = document.querySelector(`div[data-idpath='${id}']`);
  const parentOfParentTarget = parentTarget.parentElement;
  console.log("reference task idpath: ", parentTarget.dataset.idpath);
  // create taskform and place below target parent
  let form = createTaskForm({ createTask, closeForm });
  // form.classList.add('indent-1')
  switch (where) {
    case "above":
      if (parentOfParentTarget.dataset.path.includes("section")) {
        form = createTaskForm({
          createTask: createTaskUnderSection,
          closeForm
        });
      } else {
        form = createTaskForm({
          createTask: createTaskUnderProject,
          closeForm
        });
      }
      form.dataset.referencetaskid = parentTarget.firstElementChild.dataset.id;
      form.dataset.insert = "above";
      parentOfParentTarget.insertBefore(form, parentTarget);
      break;
    case "below":
      console.log("where below: ", parentOfParentTarget);
      if (parentOfParentTarget.dataset.path.includes("section")) {
        form = createTaskForm({
          createTask: createTaskUnderSection,
          closeForm
        });
      } else {
        form = createTaskForm({
          createTask: createTaskUnderProject,
          closeForm
        });
      }
      form.dataset.referencetaskid = parentTarget.firstElementChild.dataset.id;
      form.dataset.insert = "below";
      parentOfParentTarget.insertBefore(form, parentTarget.nextElementSibling);
      break;
    case "within":
      if (parentTarget.dataset.path.includes("section")) {
        form = createTaskForm({
          createTask: createTaskUnderSection,
          closeForm
        });
      } else {
        form = createTaskForm({
          createTask: createTaskUnderProject,
          closeForm
        });
      }
      form.dataset.referencetaskid = parentTarget.firstElementChild.dataset.id;
      form.dataset.insert = "within";
      parentTarget.append(form);
      break;
    case "edit":
      let taskToEdit = parentTarget.firstElementChild;
      const cancelEdit = (e) => {
        e.target.replaceWith(taskToEdit);
      };
      if (parentTarget.dataset.path.includes("section")) {
        form = createTaskForm({
          createTask: createTaskUnderSection,
          closeForm: cancelEdit
        });
      } else {
        form = createTaskForm({
          createTask: createTaskUnderProject,
          closeForm: cancelEdit
        });
      }
      form.dataset.referencetaskid = taskToEdit.dataset.id;
      form.dataset.insert = "edit";
      // populate form with task data
      let {
        name,
        description,
        dueDate,
        priorityLabel,
        priorityColor
      } = JSON.parse(taskToEdit.dataset.object);
      const taskName = form.querySelector(".task-name");
      const taskDescription = form.querySelector(".task-description");
      const dueDateEl = form.querySelector(".task-date-picker > :nth-child(2)");
      const priorityEl = form.querySelector(".priority-picker");

      taskName.value = name;
      taskDescription.value = description;
      dueDateEl.textContent = dueDate.slice(4, 10);
      priorityEl.dataset.label = priorityLabel;
      priorityEl.dataset.color = priorityColor;
      priorityEl.children[0].style.color = priorityColor;
      form.querySelector(".task-date-picker").dataset.date = dueDate;

      taskToEdit.replaceWith(form);
      break;
    default:
      break;
  }
  modalContainer.remove();
};

export const openTaskFormAbove = (e) => {
  insertElement(e, "above");
};

export const openTaskFormBelow = (e) => {
  insertElement(e, "below");
};
export const openTaskFormBelowForSubtask = (e) => {
  insertElement(e, "within");
};
export const openTaskFormForEdit = (e) => {
  insertElement(e, "edit");
};

let taskToMove = null;
let modalContainer = null;
let projectSectionListModal = null;

let parentTarget = null;
let movedTasIds = null;
let referencetaskid = null;

export const moveTask = (e) => {
  if (e.currentTarget.children[1].textContent === "Move task") {
    modalContainer = e.currentTarget.parentElement.parentElement.parentElement;
    const id = modalContainer.dataset.targetparentid;
    parentTarget = document.querySelector(`div[data-idpath='${id}']`);
    const idPath = parentTarget.dataset.idpath;
    movedTasIds = idPath.split("/");
    // remove task to be deleted from the ids
    movedTasIds = movedTasIds.slice(0, movedTasIds.length - 1);
    let taskToDelete = parentTarget.firstElementChild;
    referencetaskid = taskToDelete.dataset.id;

    showmodal(e.currentTarget, createProjectAndSectionListDialogue());
  } else {
    if (parentTarget.dataset.path.includes("section")) {
      taskToMove = saveTaskInProjectSection(
        movedTasIds,
        "",
        "move",
        referencetaskid
      );
    } else {
      taskToMove = saveTaskInProject(movedTasIds, "", "move", referencetaskid);
    }
    if (movedTasIds[0] === "inbox") {
      document.querySelector(
        ".inbox > :nth-child(3)"
      ).textContent = totalProjectTasks(readDb("inbox"));
    } else {
      updateProjectTasksCountInProjectList(movedTasIds[0]);
    }

    console.log({ taskToMove });

    const newTaskParentEl = e.currentTarget;
    projectSectionListModal =
      newTaskParentEl.parentElement.parentElement.parentElement;
    const newTaskParentIdPath = newTaskParentEl.dataset.idpath;
    const newTaskParentPath = newTaskParentEl.dataset.path;
    const newTaskParentId = newTaskParentEl.dataset.id;
    let ids = newTaskParentIdPath.split("/");

    if (newTaskParentPath.includes("section")) {
      console.log({ taskToMove });
      saveTaskInProjectSection(ids, taskToMove, "", "");
    } else {
      console.log({ taskToMove });
      saveTaskInProject(ids, taskToMove, "", "");
    }
    if (ids[0] === "inbox") {
      document.querySelector(
        ".inbox > :nth-child(3)"
      ).textContent = totalProjectTasks(readDb("inbox"));
    } else {
      updateProjectTasksCountInProjectList(ids[0]);
    }

    renderFavoriteAndProjectList();
    renderProjectPage(ids[0]);
    projectSectionListModal.remove();
    modalContainer.remove();
  }
};

export const deleteTask = (e) => {
  const modalContainer =
    e.currentTarget.parentElement.parentElement.parentElement;
  const id = modalContainer.dataset.targetparentid;
  const parentTarget = document.querySelector(`div[data-idpath='${id}']`);
  const idPath = parentTarget.dataset.idpath;
  let ids = idPath.split("/");
  // remove task to be deleted from the ids
  ids = ids.slice(0, ids.length - 1);
  let taskToDelete = parentTarget.firstElementChild;
  let referencetaskid = taskToDelete.dataset.id;

  if (parentTarget.dataset.path.includes("section")) {
    saveTaskInProjectSection(ids, "", "delete", referencetaskid);
  } else {
    saveTaskInProject(ids, "", "delete", referencetaskid);
  }

  if (ids[0] === "inbox") {
    document.querySelector(
      ".inbox > :nth-child(3)"
    ).textContent = totalProjectTasks(readDb("inbox"));
  } else {
    updateProjectTasksCountInProjectList(ids[0]);
    renderFavoriteAndProjectList();
  }
  renderProjectPage(ids[0]);

  modalContainer.remove();
};
