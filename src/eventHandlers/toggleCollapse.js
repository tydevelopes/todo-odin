const toggleCollapse = (e) => {
  console.log(e.currentTarget);
  // change icon
  let iconName = e.currentTarget.children[0].textContent;
  e.currentTarget.children[0].textContent =
    iconName === "expand_more" ? "chevron_right" : "expand_more";
  Array.from(e.currentTarget.parentElement.parentElement.children).forEach(
    (child, index) => {
      if (index !== 0) {
        child.classList.toggle("hide");
      }
    }
  );
};

export default toggleCollapse;
