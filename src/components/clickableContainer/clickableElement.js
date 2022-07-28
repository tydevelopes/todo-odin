import "./clickableElement.css";
import createIconElement from "../iconElement";

function createClickableElement(
  iconName,
  iconColor = "",
  label = null,
  eventHandler = null,
  tooltiptext = null,
  rightLabel = null
) {
  const el = document.createElement("div");
  el.classList.add("clickable");

  const icon = createIconElement(iconName, iconColor);
  el.appendChild(icon);

  if (label) {
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    el.appendChild(labelEl);
  }
  if (rightLabel) {
    const rightLabelEl = document.createElement("span");
    rightLabelEl.classList.add("right-label");
    rightLabelEl.textContent = rightLabel;
    el.appendChild(rightLabelEl);
  }

  if (eventHandler) {
    el.addEventListener("click", eventHandler);
  }

  if (tooltiptext) {
    const tooltipEl = document.createElement("span");
    tooltipEl.textContent = tooltiptext;
    tooltipEl.classList.add("tooltip");
    el.appendChild(tooltipEl);

    el.addEventListener("mouseenter", () => {
      tooltipEl.style.visibility = "visible";
    });
    el.addEventListener("mouseleave", () => {
      tooltipEl.style.visibility = "hidden";
    });
  }
  return el;
}
export default createClickableElement;
