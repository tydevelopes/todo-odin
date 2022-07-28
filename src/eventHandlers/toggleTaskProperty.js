import {
  saveTaskInProject,
  saveTaskInProjectSection
} from "../dataModel/databases/crud";
import { renderProjectPage } from "../helperFunctions/utilities";

const toggleTaskProperty = (e, taskProperty) => {
  const idPath = e.currentTarget.parentElement.parentElement.dataset.idpath;
  const path = e.currentTarget.parentElement.parentElement.dataset.path;
  let ids = idPath.split("/");
  // remove task to be updated from the ids
  ids = ids.slice(0, ids.length - 1);
  let referencetaskid = e.currentTarget.parentElement.dataset.id;

  if (path.includes("section")) {
    saveTaskInProjectSection(ids, "", taskProperty, referencetaskid);
  } else {
    saveTaskInProject(ids, "", taskProperty, referencetaskid);
  }
  renderProjectPage(ids[0]);
};

export default toggleTaskProperty;
