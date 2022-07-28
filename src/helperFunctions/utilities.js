import { v4 as uuid } from "uuid";
import { readDb } from "../dataModel/databases/crud";
import createProjectList from "../components/projectListContainer/projectList";
import createFavoriteList from "../components/favoriteListContainer/favoriteList";
import createProjectElement from "../components/projectContainer/projectElement";

export const countTasks = (tasks) => {
  console.log({ tasks });
  let count = 0;
  if (tasks.length === 0) {
    return 0;
  }
  count = tasks.length;
  tasks.forEach((task) => {
    count += countTasks(task.tasks);
  });
  return count;
};

export const totalProjectTasks = (project) => {
  if (!project) {
    return;
  }
  let result = 0;
  console.log({ project });
  result = countTasks(project.tasks);
  project.sections.forEach((section) => {
    result += countTasks(section.tasks);
  });
  return result;
};

export const getProjectData = (e) => {
  let form = e.target;
  let name = form.querySelector("input").value.trim();
  if (!name) {
    return;
  }
  let color = form.querySelector(".color-picker").dataset.color;
  let favorite = form.querySelector(".switch-wrapper").dataset.switched;

  return { name, color, favorite };
};

export const createProjectObject = ({ name, color, favorite }) => {
  // create project object to be stored as db
  const project = {
    id: uuid(),
    name,
    color,
    favorite,
    tasks: [],
    sections: []
  };

  return project;
};

export const createProjectInfoObject = (project) => {
  // create project info to store in projects db
  return {
    id: project.id,
    name: project.name,
    color: project.color,
    favorite: project.favorite,
    numOfTasks: totalProjectTasks(project)
  };
};

export const renderInbox = () => {};

export const renderFavoriteAndProjectList = () => {
  document.querySelector(".favorite-list-wrapper").remove();
  document.querySelector(".project-list-wrapper").remove();

  const projectList = readDb("projects");

  const favoriteEl = createFavoriteList(projectList);
  const projectsEl = createProjectList(projectList);
  document.querySelector(".menu-content").append(favoriteEl, projectsEl);
};

export const renderProjectPage = (projectId) => {
  const projectFromDb = readDb(projectId);

  // render project page
  const main = document.querySelector(".main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  const projectPage = createProjectElement(projectFromDb);
  main.append(projectPage);
};

export const getTaskData = (e) => {
  let form = e.target;
  let name = form.querySelector(".task-name").value.trim();
  if (!name) {
    return;
  }
  let description = form.querySelector(".task-description").value.trim();
  let dueDate = form.querySelector(".task-date-picker").dataset.date;
  let priority = form.querySelector(".priority-picker").dataset.label;

  return { name, description, dueDate, priority };
};

export const createTaskObject = ({ name, description, dueDate, priority }) => {
  // create project object to be stored as db
  const task = {
    id: uuid(),
    name,
    description,
    dueDate,
    priority,
    completed: false,
    tasks: [],
    collapsed: false
  };

  return task;
};
export const getSectionData = (e) => {
  let form = e.target;
  let name = form.querySelector(".section-form input").value.trim();
  if (!name) {
    return;
  }

  return { name };
};

export const createSectionObject = ({ name }) => {
  // create project object to be stored as db
  const section = {
    id: uuid(),
    name,
    tasks: [],
    collapsed: false
  };

  return section;
};

export const getProjectId = () => {
  return document.querySelector(".main .project-head").dataset.id;
};
export const getSectionId = (e) => {
  return e.currentTarget.parentElement.firstElementChild.dataset.id;
};

// get the ids to the path in the database where the task will be stored
export const getIds = (e) => e.target.parentElement.dataset.idpath.split("/");

export const cloneDeep = (obj) => {
  let newObj;
  if (Array.isArray(obj)) {
    newObj = [];
  } else {
    newObj = {};
  }
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      newObj[key] = cloneDeep(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
