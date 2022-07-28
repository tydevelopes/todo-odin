import { addSectionToProjectDb } from "../dataModel/databases/crud";
import {
  getSectionData,
  createSectionObject,
  getProjectId,
  renderProjectPage
} from "../helperFunctions/utilities";

const createSection = (e) => {
  e.preventDefault();

  const sectionFormData = getSectionData(e);

  // do nothing in no task name
  if (!sectionFormData) return;

  const section = createSectionObject(sectionFormData);
  let action = e.target.dataset.insert;
  let targetReferenceId = e.target.dataset.referencesectionid;

  addSectionToProjectDb(getProjectId(), section, action, targetReferenceId);

  renderProjectPage(getProjectId());
  console.log({ section });
};

export default createSection;
