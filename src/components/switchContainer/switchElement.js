import "./switchElement.css";

function switchOn() {
  document
    .querySelector(".switch")
    .animate(
      [{ transform: "translateX(0px)" }, { transform: "translateX(14px)" }],
      {
        fill: "forwards",
        duration: 200
      }
    );
}

function switchOff() {
  document
    .querySelector(".switch")
    .animate(
      [{ transform: "translateX(14px)" }, { transform: "translateX(0px)" }],
      {
        fill: "forwards",
        duration: 200
      }
    );
}

const createSwitchElement = () => {
  const container = document.createElement("div");
  container.classList.add("switch-wrapper");
  container.dataset.switched = "false";

  const switchEl = document.createElement("div");
  switchEl.classList.add("switch");

  container.appendChild(switchEl);

  container.addEventListener("click", (e) => {
    if (e.currentTarget.dataset.switched === "false") {
      e.currentTarget.style.backgroundColor = "#22c55e";
      switchOn();
      e.currentTarget.dataset.switched = "true";
    } else {
      e.currentTarget.style.backgroundColor = "";
      switchOff();
      e.currentTarget.dataset.switched = "false";
    }
  });
  return container;
};

export default createSwitchElement;
