import { readDb } from "../dataModel/databases/crud";
import createProjectElement from "../components/projectContainer/projectElement";

const renderProjectPage = (e) => {
  // render project page
  const main = document.querySelector(".main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  console.log("project id: ", e.currentTarget.dataset.id);
  const projectFromDb = readDb(e.currentTarget.dataset.id);
  const projectPage = createProjectElement(projectFromDb);

  main.append(projectPage);
};

export default renderProjectPage;
