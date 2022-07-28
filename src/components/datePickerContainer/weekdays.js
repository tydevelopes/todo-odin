const weekDays = document.createElement("div");
weekDays.classList.add("weekdays");

const weekDaysArr = ["S", "M", "T", "W", "T", "F", "S"];
weekDaysArr.forEach((day) => {
  let weekday = document.createElement("div");
  weekday.append(day);
  weekDays.append(weekday);
});

export default weekDays;
