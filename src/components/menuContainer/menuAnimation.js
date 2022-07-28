export const slideInKeyframe = [
  { transform: "translateX(-40rem)" },
  { transform: "translateX(0)" }
];
export const fadeInKeyframe = [{ opacity: "0" }, { opacity: "1" }];

export const slideOutKeyframe = [
  { transform: "translateX(0)" },
  { transform: "translateX(-40rem)" }
];
export const fadeOutKeyframe = [{ opacity: "1" }, { opacity: "0" }];

export const slideOptions = { duration: 300, fill: "forwards" };
export const fadeOptions = { duration: 300, fill: "forwards" };

export const animation = (target, keyframe, options) => {
  const effect = new KeyframeEffect(target, keyframe, options);

  return new Animation(effect);
};
