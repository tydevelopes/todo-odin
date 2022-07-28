import createSectionForm from "../components/sectionFormContainer/sectionForm";
import closeForm from "./closeForm";
import closeFormModal from "./closeModal";
import createSection from "./createSection";
import {
  updateProjectTasksCountInProjectList,
  readDb,
  addSectionToProjectDb
} from "../dataModel/databases/crud";
import {
  renderFavoriteAndProjectList,
  renderProjectPage,
  totalProjectTasks
} from "../helperFunctions/utilities";
import showmodal from "./showModal";
import createProjectAndSectionListDialogue from "../components/projectsAndSectionsDialogueContainer/projectsAndSectionsDialogue";

const insertElement = (e, where) => {
  const modalContainer =
    e.currentTarget.parentElement.parentElement.parentElement;
  const id = modalContainer.dataset.targetparentid;
  const parentTarget = document.querySelector(`div[data-idpath='${id}']`);
  const parentOfParentTarget = parentTarget.parentElement;
  console.log("reference task idpath: ", parentTarget.dataset.idpath);
  // create taskform and place below target parent
  let form = createSectionForm({ createSection, closeForm });
  // form.classList.add('indent-1')
  switch (where) {
    case "above":
      form.dataset.referencesectionid =
        parentTarget.firstElementChild.dataset.id;
      form.dataset.insert = "above";
      parentOfParentTarget.insertBefore(form, parentTarget);
      break;
    case "below":
      form.dataset.referencesectionid =
        parentTarget.firstElementChild.dataset.id;
      form.dataset.insert = "below";
      parentOfParentTarget.insertBefore(form, parentTarget.nextElementSibling);
      break;
    case "edit":
      let sectionToEdit = parentTarget.firstElementChild;
      console.log({ sectionToEdit });
      const cancelEdit = (e) => {
        e.target.replaceWith(sectionToEdit);
      };
      form = createSectionForm({ createSection, closeForm: cancelEdit });
      form.dataset.referencesectionid = sectionToEdit.dataset.id;
      form.dataset.insert = "edit";
      console.log({ form });
      // populate form with section data
      let name = sectionToEdit.dataset.name;
      const sectionName = form.querySelector(".section-name");
      console.log({ sectionName });

      sectionName.value = name;

      sectionToEdit.replaceWith(form);
      break;
    default:
      break;
  }
  modalContainer.remove();
};

export const openSectionFormAbove = (e) => {
  insertElement(e, "above");
};

export const openSectionFormBelow = (e) => {
  insertElement(e, "below");
};

export const openSectionFormForEdit = (e) => {
  insertElement(e, "edit");
};

let sectionToMove = null;
let modalContainer = null;
let projectSectionListModal = null;

let parentTarget = null;
let movedSectionIds = null;
let referenceSectionId = null;

export const moveSection = (e) => {
  console.log("moving: ", e.currentTarget);
  if (e.currentTarget.children[1].textContent === "Move section") {
    modalContainer = e.currentTarget.parentElement.parentElement.parentElement;
    const id = modalContainer.dataset.targetparentid;
    parentTarget = document.querySelector(`div[data-idpath='${id}']`);
    const idPath = parentTarget.dataset.idpath;
    movedSectionIds = idPath.split("/");
    // remove section to be deleted from the ids
    movedSectionIds = movedSectionIds.slice(0, movedSectionIds.length - 1);
    let sectionToDelete = parentTarget.firstElementChild;
    referenceSectionId = sectionToDelete.dataset.id;

    showmodal(e.currentTarget, createProjectAndSectionListDialogue(false));
  } else {
    console.log({ movedSectionIds });
    sectionToMove = addSectionToProjectDb(
      movedSectionIds[0],
      "",
      "move",
      referenceSectionId
    );

    if (movedSectionIds[0] === "inbox") {
      document.querySelector(
        ".inbox > :nth-child(3)"
      ).textContent = totalProjectTasks(readDb("inbox"));
    } else {
      updateProjectTasksCountInProjectList(movedSectionIds[0]);
    }

    console.log({ sectionToMove });

    const newSectionParentEl = e.currentTarget;
    projectSectionListModal =
      newSectionParentEl.parentElement.parentElement.parentElement;
    const newSectionParentIdPath = newSectionParentEl.dataset.idpath;
    const newSectionParentPath = newSectionParentEl.dataset.path;
    const newSectionParentId = newSectionParentEl.dataset.id;
    let ids = newSectionParentIdPath.split("/");

    console.log({ sectionToMove });
    addSectionToProjectDb(ids[0], sectionToMove, "", "");

    if (ids[0] === "inbox") {
      document.querySelector(
        ".inbox > :nth-child(3)"
      ).textContent = totalProjectTasks(readDb("inbox"));
    } else {
      updateProjectTasksCountInProjectList(ids[0]);
    }

    renderFavoriteAndProjectList();
    renderProjectPage(ids[0]);
    projectSectionListModal.remove();
    modalContainer.remove();
  }
};

export const deleteSection = (e) => {
  const modalContainer =
    e.currentTarget.parentElement.parentElement.parentElement;
  const id = modalContainer.dataset.targetparentid;
  const parentTarget = document.querySelector(`div[data-idpath='${id}']`);
  const idPath = parentTarget.dataset.idpath;
  let ids = idPath.split("/");
  // remove task to be deleted from the ids
  ids = ids.slice(0, ids.length - 1);
  let sectionToDelete = parentTarget.firstElementChild;
  let referenceSectionid = sectionToDelete.dataset.id;

  addSectionToProjectDb(ids[0], "", "delete", referenceSectionid);

  if (ids[0] === "inbox") {
    document.querySelector(
      ".inbox > :nth-child(3)"
    ).textContent = totalProjectTasks(readDb("inbox"));
  } else {
    updateProjectTasksCountInProjectList(ids[0]);
    renderFavoriteAndProjectList();
  }
  renderProjectPage(ids[0]);

  modalContainer.remove();
};
