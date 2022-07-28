import createClickableElement from "../clickableContainer/clickableElement";
import {
  openMenu,
  closeMenu,
  showMenu,
  hideMenu
} from "../../eventHandlers/menuEventHandlers";

const menuIcon = createClickableElement("menu", "", null, null, null);
menuIcon.classList.add("menu-icon");

menuIcon.addEventListener("click", (e) => {
  let container = document.querySelector(".menu-container");
  let content = document.querySelector(".menu-content");

  let mediaQuery = matchMedia("(min-width: 600px");
  if (mediaQuery.matches) {
    if (menuIcon.dataset.menustate === "closed") {
      menuIcon.dataset.menustate = "opened";
      showMenu(container, content);
    } else {
      menuIcon.dataset.menustate = "closed";
      hideMenu(container, content);
    }
  } else {
    if (menuIcon.dataset.menustate === "closed") {
      menuIcon.dataset.menustate = "opened";
      openMenu(container, content);
    } else {
      menuIcon.dataset.menustate = "closed";
      closeMenu(container, content);
    }
  }
});

export default menuIcon;
