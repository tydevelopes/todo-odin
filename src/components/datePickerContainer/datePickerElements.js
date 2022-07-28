import createInputElement from "../inputContainer/inputElement";
import createClickableElement from "../clickableContainer/clickableElement";
import { populateInput } from "../../eventHandlers/datePickerEventHandlers";

const daysArray = ["sun", "mon", "tues", "wed", "thu", "fri", "sat"];

//helpers
function getNextWeek() {
  const today = new Date();
  let day = null;
  let nextWeek = null;

  while (true) {
    day = today.getDate();
    today.setDate(day + 1);
    if (today.getDay() === 1) {
      nextWeek = new Date(today);
      break;
    }
  }

  return nextWeek.toDateString();
}

export const input = createInputElement("due date");
input.classList.add("date-form-input");
export const today = createClickableElement(
  "today",
  "#16a34a",
  "Today",
  () => populateInput(input, new Date().toDateString()),
  null,
  daysArray[new Date().getDay()]
);

const getTomorrow = () => {
  let date = new Date();
  let day = date.getDate() + 1;
  date.setDate(day);
  return date.toDateString();
};
export const tomorrow = createClickableElement(
  "light_mode",
  "#d97706",
  "Tomorrow",
  () => populateInput(input, getTomorrow()),
  null,
  daysArray[new Date(getTomorrow()).getDay()]
);

export const nextWeek = createClickableElement(
  "next_week",
  "#d97706",
  "Next Week",
  () => populateInput(input, getNextWeek()),
  null,
  getNextWeek().slice(0, 10)
);

export const month = document.createElement("div");
export const dateEl = document.createElement("div");
export const previousMonth = createClickableElement(
  "chevron_left",
  "",
  null,
  null,
  null,
  null
);
export const currentMonth = createClickableElement(
  "circle",
  "",
  null,
  null,
  null,
  null
);
export const nextMonth = createClickableElement(
  "chevron_right",
  "",
  null,
  null,
  null,
  null
);
export const daysEl = document.createElement("div");

month.classList.add("month");
dateEl.classList.add("date");
previousMonth.classList.add("prev");
currentMonth.classList.add("curr-date");
nextMonth.classList.add("next");
daysEl.classList.add("days");

dateEl.textContent = "Jul 2022";

month.append(dateEl, previousMonth, currentMonth, nextMonth);
