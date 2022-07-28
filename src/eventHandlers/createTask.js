const createTask = (e) => {
  e.preventDefault();
  console.log("creates task");
  console.log(e.target.parentElement);
};

export default createTask;
