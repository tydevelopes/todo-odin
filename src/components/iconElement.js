const createIconElement = (name, color = "") => {
  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined", "icon");
  icon.textContent = name;
  icon.style.color = color;

  return icon;
};

export default createIconElement;
