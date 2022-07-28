import {
  slideInKeyframe,
  slideOutKeyframe,
  fadeInKeyframe,
  fadeOutKeyframe,
  slideOptions,
  fadeOptions,
  animation
} from "../components/menuContainer/menuAnimation";

export const openMenu = (container, content) => {
  container.style.display = "block";
  const slideIn = animation(content, slideInKeyframe, slideOptions);
  slideIn.play();
  slideIn.finished.then((_) => {});
  const fadeIn = animation(container, fadeInKeyframe, fadeOptions);
  fadeIn.play();
  fadeIn.finished.then((_) => {
    document.body.style.overflow = "hidden";
  });
};

export const closeMenu = (container, content) => {
  const slideOut = animation(content, slideOutKeyframe, slideOptions);
  slideOut.play();
  slideOut.finished.then((value) => {
    console.log(value);
  });
  const fadeOut = animation(container, fadeOutKeyframe, fadeOptions);
  fadeOut.play();
  fadeOut.finished.then((value) => {
    container.style.display = "none";
    document.body.style.overflow = "";
  });
};

export const hideMenu = (container, content) => {
  const slideOut = animation(content, slideOutKeyframe, slideOptions);
  slideOut.play();
  slideOut.finished.then((value) => {
    container.style.display = "none";
  });
  // const fadeOut = animation(container, fadeOutKeyframe, fadeOptions);
  // fadeOut.play();
  // fadeOut.finished.then((value) => {
  //   container.style.display = "none";
  //   document.body.style.overflow = "";
  // });
};

export const showMenu = (container, content) => {
  container.style.display = "block";
  const slideIn = animation(content, slideInKeyframe, slideOptions);
  slideIn.play();
  // slideIn.finished.then((_) => {});
  // const fadeIn = animation(container, fadeInKeyframe, fadeOptions);
  // fadeIn.play();
  // fadeIn.finished.then((_) => {
  //   document.body.style.overflow = "hidden";
  // });
};
