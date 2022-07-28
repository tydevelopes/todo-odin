const selectDate = (e) => {
  e.preventDefault();
  console.log("date selected: ", e.currentTarget);
  const el = document.querySelector(".task-date-picker");
  const date = document.querySelector(".date-form-input");
  el.dataset.date = date.value;
  // el.dataset.label = e.currentTarget.dataset.label;
  el.children[1].textContent = date.value.slice(4, 10);

  // remove modal
  e.currentTarget.parentElement.remove();
};
export default selectDate;
