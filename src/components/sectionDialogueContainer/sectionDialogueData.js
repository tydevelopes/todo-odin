import * as sectionHandlers from "../../eventHandlers/sectionDialogueEventHandlers";

const sectionDialogueItems = [
  {
    label: "Add section above",
    icon: "arrow_upward",
    clickHandler: sectionHandlers.openSectionFormAbove
  },
  {
    label: "Add section below",
    icon: "arrow_downward",
    clickHandler: sectionHandlers.openSectionFormBelow
  },
  {
    label: "Edit section",
    icon: "drive_file_rename_outline",
    clickHandler: sectionHandlers.openSectionFormForEdit
  },
  {
    label: "Move section",
    icon: "arrow_circle_right",
    clickHandler: sectionHandlers.moveSection
  },
  {
    label: "Delete section",
    icon: "delete",
    clickHandler: sectionHandlers.deleteSection
  }
];

export default sectionDialogueItems;
