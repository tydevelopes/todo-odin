import * as projectHandlers from "../../eventHandlers/projectDialogueEventHandlers";
import { openSectionForm } from "../../eventHandlers/openCloseSectionForm";

const projectDialogueItems = [
  {
    label: "Edit project",
    icon: "drive_file_rename_outline",
    clickHandler: projectHandlers.openProjectFormForEdit
  },
  {
    label: "Add section",
    icon: "add_box",
    clickHandler: (e) => {
      document.querySelector(".modal-container").remove();
      return openSectionForm({
        currentTarget: document.querySelector(".add-section")
      });
    }
  },
  {
    label: "Show completed tasks",
    icon: "check_circle",
    clickHandler: projectHandlers.showCompletedTaskForProject
  },
  {
    label: "Archive project",
    icon: "archive",
    clickHandler: projectHandlers.archiveProject
  },
  {
    label: "Delete project",
    icon: "delete",
    clickHandler: projectHandlers.removeProject
  }
];

export default projectDialogueItems;
