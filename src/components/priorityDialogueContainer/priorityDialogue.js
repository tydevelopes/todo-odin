import priorityDialogueItems from "./priorityDialogueData";
import createDialogueBox from "../dialogueContainer/dialoguebox";
import createClickableElement from "../clickableContainer/clickableElement";
import selectPriority from "../../eventHandlers/selectPriority";

const items = priorityDialogueItems.map(({ label, color }) => {
  const el = createClickableElement(
    "label_important",
    color,
    label,
    selectPriority
  );
  el.dataset.color = color;
  el.dataset.label = label;
  el.children[0].classList.add("fill");
  return el;
});

const priorityDialogue = createDialogueBox(items);

export default priorityDialogue;
