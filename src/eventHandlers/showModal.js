import createModal from "../components/modalContainer/modal";
import placeContent from "../helperFunctions/positionElement";

const showmodal = (target, content) => {
  let iconDimensions = target.getBoundingClientRect();

  const modal = createModal(content, iconDimensions);
  modal.dataset.targetparentid =
    target.parentElement.parentElement.dataset.idpath;
  // pass targetparentid from one modal to another modal
  if (modal.dataset.targetparentid === "undefined") {
    modal.dataset.targetparentid =
      target.parentElement.parentElement.parentElement.dataset.targetparentid;
  }
  document.body.append(modal);

  const pos = placeContent(iconDimensions, content.getBoundingClientRect());

  content.style.left = `${pos.left}px`;
  content.style.top = `${pos.top}px`;

  // console.log('target parent: ', document.querySelector(`div[data-id='${modal.dataset.targetparentid}']`))
};

export default showmodal;
