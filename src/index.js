import "./style.css";
import createMenuElement from "./components/menuContainer/menuElement";
import createHeaderElement from "./components/headerContainer/headerElement";
import createMainElement from "./components/mainContainer/mainElement";
import createProjectElement from "./components/projectContainer/projectElement";
import { readDb, createDb } from "./dataModel/databases/crud";

//get project list from db
const projectList = readDb("projects");

const menu = createMenuElement(projectList);
const header = createHeaderElement();
const main = createMainElement();

// render today page

const wrapper = document.createElement("div");
wrapper.classList.add("menu-main-wrapper");

wrapper.append(menu, main);

document.getElementById("app").append(header, wrapper);

const init = () => {
	const theme = localStorage.getItem("theme");
	if (theme) {
		document.documentElement.className = theme;
	} else {
		document.documentElement.className = "light";
	}

	const menuIcon = document.querySelector(".menu-icon");

	let mediaQuery = matchMedia("(min-width: 600px");
	if (mediaQuery.matches) {
		menuIcon.dataset.menustate = "opened";
	} else {
		menuIcon.dataset.menustate = "closed";
	}

	if (!localStorage.getItem("inbox")) {
		createDb("inbox", {
			id: "inbox",
			name: "Inbox",
			color: "#00c3f9",
			tasks: [],
			sections: [],
		});
	}
	// render inbox on app start
	const inbox = readDb("inbox");
	const inboxPage = createProjectElement(inbox);

	main.append(inboxPage);
};

init();
