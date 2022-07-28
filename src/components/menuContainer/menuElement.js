import "./menuElement.css";
// import createMenuContents from "./menuContents";
import { closeMenu } from "../../eventHandlers/menuEventHandlers";
import createProjectList from "../projectListContainer/projectList";
import createFavoriteList from "../favoriteListContainer/favoriteList";
import createClickableElement from "../clickableContainer/clickableElement";
import renderProjectPage from "../../eventHandlers/renderProjectPage";
import renderTodayView from "../../eventHandlers/renderTodayView";
import { totalProjectTasks } from "../../helperFunctions/utilities";
import { readDb } from "../../dataModel/databases/crud";

const createMenuElement = (projects) => {
  const container = document.createElement("nav");
  const content = document.createElement("div");

  container.classList.add("menu-container");
  content.classList.add("menu-content");

  const inbox = createClickableElement(
    "inbox",
    "#00c3f9",
    "Inbox",
    renderProjectPage,
    null,
    totalProjectTasks(readDb("inbox")) || " "
  );
  const today = createClickableElement(
    "today",
    "#fb923c",
    "Today",
    renderTodayView,
    null,
    4
  );

  inbox.dataset.id = "inbox";
  inbox.classList.add("inbox");

  content.append(inbox, today);

  const favoritesList = createFavoriteList(projects);
  const projectsList = createProjectList(projects);

  content.append(favoritesList, projectsList);

  container.append(content);

  container.addEventListener("click", (e) => {
    closeMenu(container, content);
  });
  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return container;
};

export default createMenuElement;
