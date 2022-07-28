import "./taskElement.css";
import createToggleCompletedElement from "../toggleCompletedContainer/toggleCompleted";
import createClickableElement from "../clickableContainer/clickableElement";
import toggleCollapse from "../../eventHandlers/toggleCollapseForTask";
import showModal from "../../eventHandlers/showModal";
import taskDialogue from "../taskDialogueContainer/taskDialogue";
import createDatePicker from "../datePickerContainer/datePickerElement";

const createTaskElement = (parent, task) => {
  const wrapper = document.createElement("div");
  // wrapper.style.marginLeft = `${task.indentLevel * 2}rem`
  wrapper.classList.add("task-wrapper");
  wrapper.dataset.namepath = `${parent.namePath}/${task.name}`;
  wrapper.dataset.idpath = `${parent.idPath}/${task.id}`;
  wrapper.dataset.path = `${parent.path}/task`;
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.dataset.id = task.id;

  const priorityColors = {
    "priority-1": "#FF7066",
    "priority-2": "#FE9A14",
    "priority-3": "#5297FE",
    "priority-4": "#7F7F7F"
  };

  listItem.dataset.object = JSON.stringify({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    priorityLabel: task.priority,
    priorityColor: priorityColors[task.priority]
  });

  let icon = task.collapsed ? "chevron_right" : "expand_more";
  const collapsibleIcon = createClickableElement(
    icon,
    null,
    null,
    toggleCollapse
  );
  listItem.append(collapsibleIcon);
  if (!task.tasks.length) {
    collapsibleIcon.style.visibility = "hidden";
  }
  const toggleCompleted = createToggleCompletedElement(
    task.priority,
    task.completed
  );
  listItem.append(toggleCompleted);

  const taskName = createClickableElement(null, null, task.name, null);
  taskName.classList.add("task-name");

  const taskDescription =
    task.description &&
    createClickableElement(null, null, task.description, null);
  task.description && taskDescription.classList.add("task-description");

  const date =
    task.dueDate &&
    createClickableElement("event", "", task.dueDate.slice(4, 10), () =>
      showModal(date, createDatePicker())
    );

  const taskAndDescriptionWrapper = document.createElement("div");
  taskAndDescriptionWrapper.classList.add("task-description-wrapper");
  taskAndDescriptionWrapper.append(taskName, taskDescription);

  const taskAndDateWrapper = document.createElement("div");
  taskAndDateWrapper.classList.add("task-date-wrapper");
  taskAndDateWrapper.append(taskAndDescriptionWrapper, date);

  listItem.append(taskAndDateWrapper);

  const editIcon = createClickableElement(
    "drive_file_rename_outline",
    null,
    null,
    null,
    "Edit task"
  );
  const dateIcon = createClickableElement(
    "event",
    null,
    null,
    () => showModal(dateIcon, createDatePicker()),
    "Set due date"
  );
  const moreTaskIcon = createClickableElement(
    "more_horiz",
    null,
    null,
    () => showModal(moreTaskIcon, taskDialogue),
    "More task actions"
  );

  listItem.append(editIcon, dateIcon, moreTaskIcon);

  wrapper.append(listItem);

  if (task.tasks.length && !task.collapsed) {
    task.tasks.forEach((item) => {
      let subTaskParent = {
        namePath: `${parent.namePath}/${task.name}`,
        idPath: `${parent.idPath}/${task.id}`,
        path: `${parent.path}/task`
      };
      let el = createTaskElement(subTaskParent, item);
      el.classList.add("indent-1");

      wrapper.append(el);
    });
  }

  return wrapper;
};

export default createTaskElement;
