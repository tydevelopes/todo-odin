import "./toggleCompleted.css";
import toggleTaskProperty from "../../eventHandlers/toggleTaskProperty";

function createToggleCompletedElement(priority, completed, handler = null) {
  const el = document.createElement("div");
  el.classList.add("toggle-completed", priority);

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined", "completed-icon");
  icon.textContent = "check";

  if (completed) {
    icon.classList.add("show");
    icon.classList.add(`${priority}-bg`);
  }
  el.appendChild(icon);

  const addHover = () => {
    icon.classList.add("completed-icon-hover");
  };
  const removeHover = () => {
    icon.classList.remove("completed-icon-hover");
  };
  const toggleMouseEnter = () => {};

  el.addEventListener("mouseenter", addHover);
  el.addEventListener("mouseleave", removeHover);

  el.addEventListener("click", (e) => {
    icon.classList.toggle("show");
    icon.classList.toggle(`${priority}-bg`);
    el.classList.toggle("toggle-border");
    removeHover();
    if (icon.classList.contains("show")) {
      el.removeEventListener("mouseenter", addHover);
      el.removeEventListener("mouseleave", removeHover);
    } else {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    }
    toggleTaskProperty(e, "toggle-completed");
  });

  return el;
}

export default createToggleCompletedElement;
