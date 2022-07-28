import "./favoriteList.css";
import createClickableElement from "../clickableContainer/clickableElement";
import toggleCollapse from "../../eventHandlers/toggleCollapse";
import renderProjectPage from "../../eventHandlers/renderProjectPage";

const createFavoriteList = (projects) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("favorite-list-wrapper");

  const favoriteListHead = document.createElement("div");
  favoriteListHead.classList.add("favorite-list-head");

  let icon = projects?.collapsed ? "chevron_right" : "expand_more";
  const collapsibleIcon = createClickableElement(
    icon,
    null,
    "Favorites",
    toggleCollapse
  );

  favoriteListHead.append(collapsibleIcon);

  wrapper.append(favoriteListHead);

  projects?.projectList.forEach((project) => {
    if (project.favorite === "true") {
      let projectElement = createClickableElement(
        "circle",
        project.color,
        project.name,
        renderProjectPage,
        null,
        project.numOfTasks
      );
      projectElement.dataset.id = project.id;
      projectElement.classList.add("project-item");
      projectElement.children[0].classList.add("fill");
      wrapper.append(projectElement);
    }
  });

  return wrapper;
};

export default createFavoriteList;
