import "./headerElement.css";
import menuIcon from "../menuTogglerContainer/menuToggler";
import {
  homeIcon,
  addTaskIcon,
  analyticsIcon,
  themeIcon
} from "../actionIconsContainer/actionIcons";
import createSearchElement from "../searchContainer/searchElement";

const createHeaderElement = () => {
  const header = document.createElement("header");
  header.classList.add("header");

  const search = createSearchElement();

  header.append(
    menuIcon,
    homeIcon,
    search,
    addTaskIcon,
    analyticsIcon,
    themeIcon
  );

  return header;
};

export default createHeaderElement;
