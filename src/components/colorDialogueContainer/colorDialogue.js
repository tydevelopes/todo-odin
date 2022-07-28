import colorDialogueItems from "./colorDialogueData";
import createDialogueBox from "../dialogueContainer/dialoguebox";
import createClickableElement from "../clickableContainer/clickableElement";
import selectColor from "../../eventHandlers/selectColor";

const items = colorDialogueItems.map(({ label, color }) => {
  const el = createClickableElement("circle", color, label, selectColor);
  el.dataset.color = color;
  el.dataset.label = label;
  el.children[0].classList.add("fill");
  return el;
});

const colorDialogue = createDialogueBox(items);

export default colorDialogue;
