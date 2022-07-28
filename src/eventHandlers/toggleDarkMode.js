const toggleDarkMode = () => {
  const newTheme = document.documentElement.className === "dark" ? "light" : "dark";
	document.documentElement.className = newTheme;
	localStorage.setItem("theme", newTheme);
};
export default toggleDarkMode;
