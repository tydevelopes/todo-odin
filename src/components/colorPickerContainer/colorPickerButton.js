// import "./colorPickerButton.css";
// import createButton from "../buttonContainer/buttonElement";
// import createIconElement from "../iconElement";
// import colorDialogue from "./colorPickerDialogue";

// const toggleDialogueVisibility = () => {
//   document
//     .querySelector(".color-dialogue-container > .list")
//     .classList.toggle("show-dialogue");
// };

// const createColorPickerButton = (label = "gray") => {
//   const container = document.createElement("div");
//   container.classList.add("color-dialogue-container");

//   const icon = createIconElement("circle", "gray");
//   icon.classList.add("color-value");
//   const el = document.createElement("span");
//   el.classList.add("color-label");
//   el.append(label);
//   const btn = createButton(icon, "button");
//   btn.append(el);
//   container.append(btn, colorDialogue);

//   container.addEventListener("click", toggleDialogueVisibility);

//   return container;
// };

// export default createColorPickerButton;
