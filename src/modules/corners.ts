/**
 * @module
 *
 * This module is responsible for the window corner functionalities, like moving to the top, left,
 * bottom, top-right, etc...
 */

type Corner = 'top-right'|'top-left'|'bottom-right'|'bottom-left'|'right'|'left'|'top'|'bottom'|'center'|'full';

// Debounce variables for detecting repeated key presses
let lastKey: string | null = null;
let lastCallTime: number = Date.now();
let keyPressCount: number = 0;

/**
 * Move the window to the main screen corners
 *
 * The default window size is 50% of the screen and it changes 25% on every key
 * repetition starting by 50%, example: 50% -> 75% -> 25% -> 50%
 */
export const moveWindowTo = (corner: Corner) => {
  const now = Date.now();
  const $window = Window.focused();

  if (!$window) return;

  const $screen = $window.screen().flippedVisibleFrame();
  const screenWidth = $screen.width;
  const screenHeight = $screen.height;

  let windowSize = 50;
  if (corner === lastKey && now - lastCallTime < 1000) {
    keyPressCount += 1;
  } else {
    keyPressCount = 1;
  }

  if (keyPressCount === 2) {
    windowSize = 75;
  } else if (keyPressCount === 3) {
    windowSize = 25;
  } else if (keyPressCount > 3) {
    windowSize = 50;
    keyPressCount = 1;
  }

  lastKey = corner;
  lastCallTime = now;

  let x, y;
  let w = (screenWidth * windowSize) / 100;
  let h = (screenHeight * windowSize) / 100;

  switch (corner) {
    case "left":
      x = 0;
      y = 0;
      h = screenHeight;
      break;
    case "right":
      x = screenWidth - w;
      y = 0;
      h = screenHeight;
      break;
    case "top":
      x = 0;
      y = 0;
      w = screenWidth;
      break;
    case "bottom":
      x = 0;
      y = screenHeight - h;
      w = screenWidth;
      break;
    case "center":
      x = 0;
      y = 0;
      w = screenWidth;
      h = screenHeight;
      break;
    case "top-left":
      x = 0;
      y = 0;
      break;
    case "top-right":
      x = screenWidth - w;
      y = 0;
      break;
    case "bottom-right":
      x = screenWidth - w;
      y = screenHeight - h;
      break;
    case "bottom-left":
      x = 0;
      y = screenHeight - h;
      break;
    default:
      Phoenix.log("ERROR: Invalid position specified");
      return;
  }

  $window.setTopLeft({ x, y });
  $window.setSize({
    width: w,
    height: h,
  });
};
