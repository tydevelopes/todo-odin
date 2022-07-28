import {
  createDb,
  updateProject,
  addProjectToProjectListDb,
  updateProjectInProjectList
} from "../dataModel/databases/crud";
import {
  getProjectData,
  createProjectObject,
  createProjectInfoObject,
  renderFavoriteAndProjectList,
  renderProjectPage
} from "../helperFunctions/utilities";

const createProject = (e) => {
  e.preventDefault();

  const projectFormData = getProjectData(e);

  // do nothing in no project name
  if (!projectFormData) return;

  // create project object to be stored as db

  if (e.target.dataset.action === "edit") {
    const projectId = e.target.dataset.projectid;
    const updatedInfo = { ...projectFormData };
    updateProject(projectId, updatedInfo);
    updateProjectInProjectList(projectId, updatedInfo);
    renderProjectPage(projectId);
  } else {
    const project = createProjectObject(projectFormData);
    // create project info to store in projects db
    const projecInfo = createProjectInfoObject(project);

    // store data in db
    createDb(project.id, project);
    addProjectToProjectListDb("projects", projecInfo);
    renderProjectPage(project.id);
  }

  renderFavoriteAndProjectList();

  // remove modal
  e.target.parentElement.remove();
  // remove second modal
  e.target.dataset.action === "edit" &&
    document.querySelector(".modal-container").remove();
};

export default createProject;
