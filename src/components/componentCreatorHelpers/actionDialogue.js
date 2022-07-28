import createDialogueBox from "../dialogueContainer/dialoguebox";
import createClickableElement from "../clickableContainer/clickableElement";

const createActionDialogue = (items) => {
  const listItems = items.map(({ label, icon, clickHandler }) => {
    return createClickableElement(icon, "", label, clickHandler);
  });
  return createDialogueBox(listItems);
};

export default createActionDialogue;
