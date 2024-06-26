/**
 * Calculate the frame ratio for the screen size
 */
export const frameRatio = (a: Rectangle, b: Rectangle) => {
  const widthRatio = b.width / a.width;
  const heightRatio = b.height / a.height;

  return ({ width, height, x, y }: Rectangle) => {
    width = Math.round(width * widthRatio);
    height = Math.round(height * heightRatio);
    x = Math.round(b.x + (x - a.x) * widthRatio);
    y = Math.round(b.y + (y - a.y) * heightRatio);

    return { width, height, x, y };
  };
};
