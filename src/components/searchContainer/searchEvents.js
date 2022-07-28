const addEvents = (form, input, searchIcon, closeIcon) => {
  // add focus to search when clicked

  form.addEventListener("focus", (e) => {
    input.focus();
  });
  input.addEventListener("focus", () => {
    form.style.outline = "1px solid var(--border-color)";
    form.classList.add("increase-width");
    searchIcon.style.color = "var(--icon-color)";
    closeIcon.style.visibility = "visible";
  });
  // when search input loses focus
  input.addEventListener("blur", () => {
    form.style.outline = "none";
    form.classList.remove("increase-width");
    searchIcon.style.color = "";
    closeIcon.style.visibility = "hidden";
  });
  // close search
  closeIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    closeIcon.style.visibility = "hidden";
    input.blur();
  });
};

export default addEvents;
