import "./mainElement.css";

const createMainElement = () => {
  const main = document.createElement("main");
  main.classList.add("main");

  return main;
};

export default createMainElement;
