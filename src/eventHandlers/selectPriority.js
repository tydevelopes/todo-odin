const selectPriority = (e) => {
  console.log(e.currentTarget.dataset.color);
  const el = document.querySelector(".priority-picker");
  el.dataset.color = e.currentTarget.dataset.color;
  el.dataset.label = e.currentTarget.dataset.label;
  el.children[0].style.color = e.currentTarget.dataset.color;

  // remove modal
  e.currentTarget.parentElement.parentElement.parentElement.remove();
};
export default selectPriority;
