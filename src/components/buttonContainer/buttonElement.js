import "./buttonElement.css";

const createButtonElement = (name, type) => {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.append(name);

  return button;
};

export default createButtonElement;
