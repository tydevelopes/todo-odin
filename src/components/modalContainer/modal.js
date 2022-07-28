import "./modal.css";

const createModal = (content, dimension) => {
  const container = document.createElement("div");
  container.classList.add("modal-container");

  content.style.left = `${dimension.left}px`;
  content.style.top = `${dimension.bottom}px`;

  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  container.append(content);

  container.addEventListener("click", () => {
    document.body.removeChild(container);
  });

  return container;
};

export default createModal;
