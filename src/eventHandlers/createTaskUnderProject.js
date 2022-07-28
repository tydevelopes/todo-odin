import {
  updateProjectTasksCountInProjectList,
  saveTaskInProject,
  readDb
} from "../dataModel/databases/crud";
import {
  getTaskData,
  createTaskObject,
  getIds,
  renderFavoriteAndProjectList,
  renderProjectPage,
  totalProjectTasks
} from "../helperFunctions/utilities";

const createTaskUnderProject = (e) => {
  e.preventDefault();

  const taskFormData = getTaskData(e);

  // do nothing in no task name
  if (!taskFormData) return;

  const task = createTaskObject(taskFormData);
  let ids = getIds(e);
  // addTaskToProjectDb(getProjectId(), task);

  let insert = e.target.dataset.insert;
  let targetReferenceId = e.target.dataset.referencetaskid;

  // if editing, remove task to be edited from the ids
  if (insert === "edit") {
    ids = ids.slice(0, ids.length - 1);
  }

  saveTaskInProject(ids, task, insert, targetReferenceId);

  if (ids[0] === "inbox") {
    document.querySelector(
      ".inbox > :nth-child(3)"
    ).textContent = totalProjectTasks(readDb("inbox"));
  } else {
    updateProjectTasksCountInProjectList(ids[0]);
    renderFavoriteAndProjectList();
  }
  renderProjectPage(ids[0]);

  if (e.target.parentElement.classList.contains("modal-container")) {
    e.target.parentElement.remove();
  }
};

export default createTaskUnderProject;
