import createTaskForm from "../components/taskFormContainer/taskForm";
import createClickableElement from "../components/clickableContainer/clickableElement";
import createTaskUnderSection from "./createTaskUnderSection";
import createTaskUnderProject from "./createTaskUnderProject";

export const openTaskFormUnderProject = (e) => {
  let element = e.currentTarget;
  console.log("parent: ", element.parentElement);
  const taskForm = createTaskForm({
    createTask: createTaskUnderProject,
    closeForm: closeTaskFormUnderProject
  });

  element.replaceWith(taskForm);
};

export const openTaskFormUnderSection = (e) => {
  let element = e.currentTarget;
  console.log("parent: ", element.parentElement);
  const taskForm = createTaskForm({
    createTask: createTaskUnderSection,
    closeForm: closeTaskFormUnderSection
  });

  element.replaceWith(taskForm);
};

export const closeTaskFormUnderSection = (e) => {
  const taskForm = e.target;

  const addTaskIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add task",
    openTaskFormUnderSection
  );

  taskForm.replaceWith(addTaskIcon);
};
export const closeTaskFormUnderProject = (e) => {
  const taskForm = e.target;

  const addTaskIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add task",
    openTaskFormUnderProject
  );

  taskForm.replaceWith(addTaskIcon);
};

// export default openTaskForm;
