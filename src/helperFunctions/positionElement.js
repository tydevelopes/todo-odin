const placeContent = (iconDimensions, contentDimensions) => {
  const pos = {};
  if (iconDimensions.bottom + contentDimensions.bottom < window.innerHeight) {
    pos.top = iconDimensions.bottom;
  } else if (iconDimensions.top - contentDimensions.height > 0) {
    pos.top = iconDimensions.top - contentDimensions.height;
  } else {
    pos.top = iconDimensions.top - contentDimensions.height / 2;
    pos.top =
      pos.top < 0
        ? 0
        : pos.top + contentDimensions.height > window.innerHeight
        ? window.innerHeight - contentDimensions.height
        : pos.top;
    if (iconDimensions.left - contentDimensions.width > 0) {
      pos.left = iconDimensions.left - contentDimensions.width;
    } else {
      pos.left = iconDimensions.right;
    }
    return pos;
  }
  if (iconDimensions.left - contentDimensions.width / 2 > 0) {
    if (
      contentDimensions.right -
        contentDimensions.width / 2 +
        iconDimensions.width <
      window.innerWidth
    ) {
      pos.left =
        iconDimensions.left -
        contentDimensions.width / 2 +
        iconDimensions.width / 2;
    } else {
      pos.left = iconDimensions.right - contentDimensions.width;
    }
  }
  return pos;
};

export default placeContent;
