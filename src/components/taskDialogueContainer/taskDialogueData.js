import * as taskHandlers from "../../eventHandlers/taskDialogueEventHandlers";

const taskDialogueItems = [
  {
    label: "Add task above",
    icon: "arrow_upward",
    clickHandler: taskHandlers.openTaskFormAbove
  },
  {
    label: "Add task below",
    icon: "arrow_downward",
    clickHandler: taskHandlers.openTaskFormBelow
  },
  {
    label: "Add subtask",
    icon: "subdirectory_arrow_right",
    clickHandler: taskHandlers.openTaskFormBelowForSubtask
  },
  {
    label: "Edit task",
    icon: "drive_file_rename_outline",
    clickHandler: taskHandlers.openTaskFormForEdit
  },
  {
    label: "Move task",
    icon: "arrow_circle_right",
    clickHandler: taskHandlers.moveTask
  },
  {
    label: "Delete task",
    icon: "delete",
    clickHandler: taskHandlers.deleteTask
  }
];

export default taskDialogueItems;
