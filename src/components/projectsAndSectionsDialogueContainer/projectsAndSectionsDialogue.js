import createDialogueBox from "../dialogueContainer/dialoguebox";
import createClickableElement from "../clickableContainer/clickableElement";
import { readDb } from "../../dataModel/databases/crud";
import { moveSection } from "../../eventHandlers/sectionDialogueEventHandlers";
import { moveTask } from "../../eventHandlers/taskDialogueEventHandlers";

const createProjectAndSectionListDialogue = (sectionIncluded = true) => {
  let projecIds = readDb("projects")?.projectList.map((item) => item.id);
  // Add inbox to project ids
  projecIds = projecIds ? ["inbox", ...projecIds] : ["inbox"];

  let listObj = projecIds.map((projectId) => {
    let project = readDb(projectId);
    let { name, color } = project;
    let sections =
      sectionIncluded &&
      project.sections.map(({ id, name }) => ({
        id,
        name,
        idPath: `${projectId}/${id}`,
        path: "project/section"
      }));
    return {
      id: projectId,
      name,
      color,
      idPath: projectId,
      path: "project",
      sections
    };
  });

  let dialogueItems = listObj.map((item) => {
    let projectEl = createClickableElement(
      item.id === "inbox" ? "inbox" : "circle",
      item.color,
      item.name,
      sectionIncluded ? moveTask : moveSection
    );
    projectEl.dataset.idpath = item.idPath;
    projectEl.dataset.path = item.path;
    projectEl.dataset.id = item.id;

    if (item.sections) {
      let sectionEls = item.sections.map((item) => {
        let sectionEl = createClickableElement(
          "widgets",
          "",
          item.name,
          sectionIncluded ? moveTask : moveSection
        );
        sectionEl.dataset.idpath = item.idPath;
        sectionEl.dataset.path = item.path;
        sectionEl.dataset.id = item.id;
        sectionEl.classList.add("indent-1");

        return sectionEl;
      });

      return [projectEl, ...sectionEls];
    }
    return [projectEl];
  });
  dialogueItems = dialogueItems.flat();

  return createDialogueBox(dialogueItems);
};

export default createProjectAndSectionListDialogue;
