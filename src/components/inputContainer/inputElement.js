import "./inputElement.css";

const createInputElement = (placeholder) => {
  const input = document.createElement("input");
  input.placeholder = placeholder;

  return input;
};

export default createInputElement;
