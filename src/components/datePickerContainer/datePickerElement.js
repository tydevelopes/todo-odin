import "./datePickerElement.css";
import createDate from "../../eventHandlers/createDate";
import createButtonElement from "../buttonContainer/buttonElement";
import weekDays from "./weekdays";
import {
  input,
  today,
  tomorrow,
  nextWeek,
  previousMonth,
  currentMonth,
  nextMonth,
  dateEl,
  month,
  daysEl
} from "./datePickerElements";

const createDatePicker = () => {
  let date = new Date();
  let selectedDate = null;

  const renderCalendar = () => {
    date.setDate(1);

    const monthDays = daysEl;

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    dateEl.textContent = `${months[date.getMonth()]}  ${date.getFullYear()}`;

    input.value = selectedDate ? selectedDate.toDateString() : "";

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date prev">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === selectedDate?.getDate() &&
        date.getMonth() === selectedDate?.getMonth()
      ) {
        days += `<div class="selected curr">${i}</div>`;
      } else if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today curr">${i}</div>`;
      } else {
        days += `<div class="curr">${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date next">${j}</div>`;
      monthDays.innerHTML = days;
    }
  };

  previousMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextMonth.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  currentMonth.addEventListener("click", () => {
    date = new Date();
    renderCalendar();
  });

  daysEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("curr")) {
      date.setDate(e.target.textContent);
      document.querySelectorAll(".curr").forEach((day) => {
        day.classList.remove("selected");
      });
      e.target.classList.add("selected");
      document.querySelector(".date-form-input").value = date.toDateString();
      selectedDate = new Date(date.getTime());
    }
    if (e.target.classList.contains("prev")) {
      date.setMonth(date.getMonth() - 1);
      date.setDate(e.target.textContent);
      selectedDate = new Date(date.getTime());
      renderCalendar();
      document.querySelector(
        ".date-form-input"
      ).value = selectedDate.toDateString();
    }
    if (e.target.classList.contains("next")) {
      date.setMonth(date.getMonth() + 1);
      date.setDate(e.target.textContent);
      selectedDate = new Date(date.getTime());
      renderCalendar();
      document.querySelector(
        ".date-form-input"
      ).value = selectedDate.toDateString();
    }
  });

  renderCalendar();

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("date-btns");
  const cancelBtn = createButtonElement("cancel", "reset");
  const submitBtn = createButtonElement("Save", "submit");

  buttonsContainer.append(cancelBtn, submitBtn);

  const form = document.createElement("form");
  form.classList.add("date-form");
  // form.addEventListener("submit", createDate);
  form.append(
    input,
    today,
    tomorrow,
    nextWeek,
    month,
    weekDays,
    daysEl,
    buttonsContainer
  );

  return form;
};

export default createDatePicker;
