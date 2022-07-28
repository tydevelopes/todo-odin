import createSectionForm from "../components/sectionFormContainer/sectionForm";
import createClickableElement from "../components/clickableContainer/clickableElement";
import createSection from "./createSection";

export const openSectionForm = (e) => {
  console.log({ e });
  let element = e.currentTarget;
  const sectionForm = createSectionForm({
    createSection,
    closeForm: closeSectionForm
  });

  element.replaceWith(sectionForm);
};

export const closeSectionForm = (e) => {
  const sectionForm = e.target;

  const addSectionIcon = createClickableElement(
    "add",
    "#ff7066",
    "Add section",
    openSectionForm
  );

  sectionForm.replaceWith(addSectionIcon);
};
