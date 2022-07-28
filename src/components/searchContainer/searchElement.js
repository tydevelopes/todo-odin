import "./searchElement.css";
import createInputElement from "../inputContainer/inputElement";
import createClickableElement from "../clickableContainer/clickableElement";
import addEvents from "./searchEvents";

const createSearchElement = () => {
  const form = document.createElement("form");
  form.classList.add("search-form");
  form.tabIndex = 0;

  const input = createInputElement("search");
  const searchIcon = createClickableElement("search");
  const closeIcon = createClickableElement("close");

  searchIcon.classList.add("search-icon");
  closeIcon.classList.add("close-search");
  closeIcon.style.visibility = "hidden";

  form.append(searchIcon, input, closeIcon);

  addEvents(form, input, searchIcon, closeIcon);

  return form;
};

export default createSearchElement;
