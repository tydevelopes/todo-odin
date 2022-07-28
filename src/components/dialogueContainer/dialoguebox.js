import "./dialoguebox.css";

function createDialogueBox(content) {
  const list = document.createElement("ul");
  list.classList.add("list", "dialogue");
  let listItem;
  content.forEach((element) => {
    listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.appendChild(element);
    list.appendChild(listItem);
  });

  return list;
}
export default createDialogueBox;
