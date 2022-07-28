import { v4 as uuid } from "uuid";
import { totalProjectTasks, cloneDeep } from "../../helperFunctions/utilities";

let taskToMove = null;
let sectionToMove = null;

export const createDb = (db, data) => {
  localStorage.setItem(db, JSON.stringify(data));
};

export const readDb = (db) => {
  return JSON.parse(localStorage.getItem(db));
};

export const deleteProject = (id) => {
  localStorage.removeItem(id);
};

export const updateProject = (id, data) => {
  let project = readDb(id);
  project = { id, ...data, tasks: project.tasks, sections: project.sections };
  createDb(id, project);
};

export const addProjectToProjectListDb = (db, data) => {
  let dbData = readDb(db);
  if (dbData) {
    dbData.projectList.push(data);
  } else {
    dbData = {
      id: uuid(),
      collapsed: false,
      projectList: [data]
    };
  }
  createDb(db, dbData);
};

export const deleteProjectInProjectList = (projectId) => {
  let projects = readDb("projects");
  let projectList = projects.projectList.filter(
    (item) => item.id !== projectId
  );
  projects = { ...projects, projectList };
  createDb("projects", projects);
};

export const addTaskToProjectDb = (projectId, task) => {
  let project = readDb(projectId);
  project.tasks.push(task);
  createDb(projectId, project);
};

export const addSectionToProjectDb = (
  projectId,
  newSection,
  action,
  referenceSectionId
) => {
  let project = readDb(projectId);
  let sections = updateSections(
    project.sections,
    action,
    referenceSectionId,
    newSection
  );
  sections = sections.flat();
  project = { ...project, sections };
  createDb(projectId, project);

  return sectionToMove;
};

export const addTaskToSectionOfProject = (projectId, sectionId, task) => {
  let project = readDb(projectId);

  // section to add task to
  let section = project.sections.find((section) => section.id === sectionId);
  section.tasks.push(task);

  // replace old section with new section
  let sections = project.sections.map((item) => {
    if (item.id === section.id) {
      return section;
    }
    return item;
  });
  // replace old sections with new sections
  project = { ...project, sections };

  // store db
  createDb(projectId, project);
};

export const updateProjectInProjectList = (projectId, data) => {
  const project = readDb(projectId);
  let projects = readDb("projects");
  let projectList = projects.projectList.map((item) => {
    if (item.id === projectId) {
      return { id: item.id, ...data, numOfTasks: totalProjectTasks(project) };
    }
    return item;
  });
  projects = { ...projects, projectList };
  createDb("projects", projects);
};
export const updateProjectTasksCountInProjectList = (projectId) => {
  const project = readDb(projectId);
  let projects = readDb("projects");
  let projectList = projects.projectList.map((item) => {
    if (item.id === projectId) {
      return { ...item, numOfTasks: totalProjectTasks(project) };
    }
    return item;
  });
  projects = { ...projects, projectList };
  createDb("projects", projects);
};

// NOTE:- use concat instead of push. concat returns new array while push returns length of new array
// use referenceTask to determine where to insert task when inserting above or below
export const saveTaskInProject = (ids, newTask, insert, referenceTaskId) => {
  if (ids.length === 1) {
    // only project id
    let projectId = ids[0];
    let project = readDb(projectId);
    let updatedTasks = updateTasks(
      project.tasks,
      insert,
      referenceTaskId,
      newTask
    );
    updatedTasks = updatedTasks.flat();

    project = { ...project, tasks: updatedTasks };
    createDb(projectId, project);
  } else if (ids.length === 2) {
    // project id and a task id
    // look for a task that belongs to a project
    // project->task

    let projectId = ids[0];
    let taskId = ids[1];
    let project = readDb(projectId);
    let tasks = project.tasks.map((task) => {
      if (task.id === taskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    project = { ...project, tasks };
    createDb(projectId, project);
  } else if (ids.length === 3) {
    // project id, task id, task id
    // look for a task that belongs to a task that belongs to a project
    // project->task->task
    let projectId = ids[0];
    let taskId = ids[1];
    let subTaskId = ids[2];
    let project = readDb(projectId);
    // find task in project's tasks
    let task = project.tasks.find((item) => item.id === taskId);
    // find task in task's tasks and add newtask
    let tasks = task.tasks.map((task) => {
      if (task.id === subTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    task = { ...task, tasks };
    let projectTasks = project.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    project = { ...project, tasks: projectTasks };
    createDb(projectId, project);
  } else if (ids.length === 4) {
    // project id, task id, task id, task id
    // look for a task that belongs to a task that belongs to a task that belongs to a project
    // project->task->task->task
    let projectId = ids[0];
    let taskId = ids[1];
    let subTaskId = ids[2];
    let subSubTaskId = ids[3];
    let project = readDb(projectId);
    let task = project.tasks.find((item) => item.id === taskId);
    let subTask = task.tasks.find((item) => item.id === subTaskId);
    let tasks = subTask.tasks.map((task) => {
      if (task.id === subSubTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    subTask = { ...subTask, tasks };
    let taskTasks = task.tasks.map((item) => {
      if (item.id === subTaskId) {
        return subTask;
      }
      return item;
    });
    task = { ...task, tasks: taskTasks };
    let projectTasks = project.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    project = { ...project, tasks: projectTasks };
    createDb(projectId, project);
  } else if (ids.length === 5) {
    // project id, task id, task id, task id, task id
    // look for a task that belongs to a task that belongs to a task that belongs to a task that belongs to a project
    // project->task->task->task->task
    let projectId = ids[0];
    let taskId = ids[1];
    let subTaskId = ids[2];
    let subSubTaskId = ids[3];
    let subSubSubTaskId = ids[4];
    let project = readDb(projectId);
    let task = project.tasks.find((item) => item.id === taskId);
    let subTask = task.tasks.find((item) => item.id === subTaskId);
    let subSubTask = subTask.tasks.find((item) => item.id === subSubTaskId);
    let tasks = subSubTask.tasks.map((task) => {
      if (task.id === subSubSubTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    subSubTask = { ...subSubTask, tasks };
    let subTaskTasks = subTask.tasks.map((item) => {
      if (item.id === subSubTaskId) {
        return subSubTask;
      }
      return item;
    });
    subTask = { ...subTask, tasks: subTaskTasks };
    let taskTasks = task.tasks.map((item) => {
      if (item.id === subTaskId) {
        return subTask;
      }
      return item;
    });
    task = { ...task, tasks: taskTasks };
    let projectTasks = project.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    project = { ...project, tasks: projectTasks };
    createDb(projectId, project);
  } else {
    return;
  }
  return taskToMove;
};

export const saveTaskInProjectSection = (
  ids,
  newTask,
  insert,
  referenceTaskId
) => {
  if (ids.length === 2) {
    // project id and section id
    // project->section
    let projectId = ids[0];
    let sectionId = ids[1];
    let project = readDb(projectId);
    let sections = project.sections.map((section) => {
      if (section.id === sectionId) {
        let updatedTasks = updateTasks(
          section.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...section, tasks: updatedTasks };
      }
      return section;
    });
    project = { ...project, sections };
    createDb(projectId, project);
  } else if (ids.length === 3) {
    // project id, section id, task id
    // project->section->task
    let projectId = ids[0];
    let sectionId = ids[1];
    let taskId = ids[2];
    let project = readDb(projectId);
    let section = project.sections.find((item) => item.id === sectionId);
    let tasks = section.tasks.map((task) => {
      if (task.id === taskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    section = { ...section, tasks };
    let sections = project.sections.map((item) => {
      if (item.id === sectionId) {
        return section;
      }
      return item;
    });
    project = { ...project, sections };
    createDb(projectId, project);
  } else if (ids.length === 4) {
    // project id, section id, task id, task id
    // project->section->task->task
    let projectId = ids[0];
    let sectionId = ids[1];
    let taskId = ids[2];
    let subTaskId = ids[3];
    let project = readDb(projectId);
    let section = project.sections.find((item) => item.id === sectionId);
    let task = section.tasks.find((item) => item.id === taskId);
    let tasks = task.tasks.map((task) => {
      if (task.id === subTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    task = { ...task, tasks };
    let secionTasks = section.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    section = { ...section, tasks: secionTasks };
    let sections = project.sections.map((item) => {
      if (item.id === sectionId) {
        return section;
      }
      return item;
    });

    project = { ...project, sections };
    createDb(projectId, project);
  } else if (ids.length === 5) {
    // project id, section id, task id, task id, task id
    // project->section->task->task->task
    let projectId = ids[0];
    let sectionId = ids[1];
    let taskId = ids[2];
    let subTaskId = ids[3];
    let subSubTaskId = ids[4];
    let project = readDb(projectId);
    let section = project.sections.find((item) => item.id === sectionId);
    let task = section.tasks.find((item) => item.id === taskId);
    let subTask = task.tasks.find((item) => item.id === subTaskId);
    let tasks = subTask.tasks.map((task) => {
      if (task.id === subSubTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    subTask = { ...subTask, tasks };
    let taskTasks = task.tasks.map((item) => {
      if (item.id === subTaskId) {
        return subTask;
      }
      return item;
    });
    task = { ...task, tasks: taskTasks };
    let secionTasks = section.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    section = { ...section, tasks: secionTasks };
    let sections = project.sections.map((item) => {
      if (item.id === sectionId) {
        return section;
      }
      return item;
    });

    project = { ...project, sections };
    createDb(projectId, project);
  } else if (ids.length === 6) {
    // project id, section id, task id, task id, task id, task id
    // project->section->task->task->task->task
    let projectId = ids[0];
    let sectionId = ids[1];
    let taskId = ids[2];
    let subTaskId = ids[3];
    let subSubTaskId = ids[4];
    let subSubSubTaskId = ids[5];
    let project = readDb(projectId);
    let section = project.sections.find((item) => item.id === sectionId);
    let task = section.tasks.find((item) => item.id === taskId);
    let subTask = task.tasks.find((item) => item.id === subTaskId);
    let subSubTask = subTask.tasks.find((item) => item.id === subSubTaskId);
    let tasks = subSubTask.tasks.map((task) => {
      if (task.id === subSubSubTaskId) {
        let updatedTasks = updateTasks(
          task.tasks,
          insert,
          referenceTaskId,
          newTask
        );
        updatedTasks = updatedTasks.flat();
        return { ...task, tasks: updatedTasks };
      }
      return task;
    });
    subSubTask = { ...subSubTask, tasks };
    let subTaskTasks = subTask.tasks.map((item) => {
      if (item.id === subSubTaskId) {
        return subSubTask;
      }
      return item;
    });
    subTask = { ...subTask, tasks: subTaskTasks };
    let taskTasks = task.tasks.map((item) => {
      if (item.id === subTaskId) {
        return subTask;
      }
      return item;
    });
    task = { ...task, tasks: taskTasks };
    let secionTasks = section.tasks.map((item) => {
      if (item.id === taskId) {
        return task;
      }
      return item;
    });
    section = { ...section, tasks: secionTasks };
    let sections = project.sections.map((item) => {
      if (item.id === sectionId) {
        return section;
      }
      return item;
    });

    project = { ...project, sections };
    createDb(projectId, project);
  } else {
    return;
  }
  return taskToMove;
};

const updateTasks = (tasks, action, referenceTaskId, newTask) => {
  if (action === "above") {
    return tasks.map((task) => {
      if (task.id === referenceTaskId) {
        return [newTask, task];
      }
      return task;
    });
  } else if (action === "below") {
    return tasks.map((task) => {
      if (task.id === referenceTaskId) {
        return [task, newTask];
      }
      return task;
    });
  } else if (action === "edit") {
    return tasks.map((task) => {
      // replace old data with new data except id and tasks
      if (task.id === referenceTaskId) {
        return { ...newTask, id: referenceTaskId, tasks: task.tasks };
      }
      return task;
    });
  } else if (action === "delete") {
    return tasks.filter((task) => task.id !== referenceTaskId);
  } else if (action === "move") {
    return tasks.filter((task) => {
      if (task.id === referenceTaskId) {
        taskToMove = task;
        return false;
      }
      return true;
    });
  } else if (action === "toggle-completed") {
    return tasks.map((task) => {
      // toggle task completed
      if (task.id === referenceTaskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  } else if (action === "toggle-collapsed") {
    return tasks.map((task) => {
      // toggle task collapsed
      if (task.id === referenceTaskId) {
        return { ...task, collapsed: !task.collapsed };
      }
      return task;
    });
  } else {
    return tasks.concat(newTask);
  }
};
const updateSections = (sections, action, referenceSectionId, newSection) => {
  if (action === "above") {
    return sections.map((section) => {
      if (section.id === referenceSectionId) {
        return [newSection, section];
      }
      return section;
    });
  } else if (action === "below") {
    return sections.map((section) => {
      if (section.id === referenceSectionId) {
        return [section, newSection];
      }
      return section;
    });
  } else if (action === "edit") {
    return sections.map((section) => {
      // replace old data with new data except id and tasks
      if (section.id === referenceSectionId) {
        return { ...newSection, id: referenceSectionId, tasks: section.tasks };
      }
      return section;
    });
  } else if (action === "delete") {
    return sections.filter((section) => section.id !== referenceSectionId);
  } else if (action === "move") {
    return sections.filter((section) => {
      if (section.id === referenceSectionId) {
        sectionToMove = section;
        return false;
      }
      return true;
    });
  } else if (action === "toggle-collapsed") {
    return sections.map((section) => {
      // toggle task collapsed
      if (section.id === referenceSectionId) {
        return { ...section, collapsed: !section.collapsed };
      }
      return section;
    });
  } else {
    return sections.concat(newSection);
  }
};

const modifyTasks = (id, tasks, action, referenceTaskId, newTask) => {
  return tasks.map((task) => {
    if (task.id === id) {
      let updatedTasks = updateTasks(
        task.tasks,
        action,
        referenceTaskId,
        newTask
      );
      updatedTasks = updatedTasks.flat();
      return { ...task, tasks: updatedTasks };
    }
    return task;
  });
};

const modifyTaskTasks = (taskTasks, tasktaskId, modifiedTask) => {
  return taskTasks.map((task) => {
    if (task.id === tasktaskId) {
      return modifiedTask;
    }
    return task;
  });
};
