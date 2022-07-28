import toggleTaskProperty from "./toggleTaskProperty";
import toggleCollapse from "./toggleCollapse";

const toggleCollapseForTask = (e) => {
  toggleCollapse(e);
  toggleTaskProperty(e, "toggle-collapsed");
};

export default toggleCollapseForTask;
