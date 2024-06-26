/**
 * @module
 *
 * This module is responsible for the window corner functionalities, like moving to the top, left,
 * bottom, top-right, etc.
 */

type Corner = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'right' | 'left' | 'top' | 'bottom' | 'center' | 'full';

// Debounce variables for detecting repeated key presses
let lastKey: Corner | null = null;
let lastCallTime: number = Date.now();
let keyPressCount: number = 0;

/**
 * Move the focused window to a specified corner of the screen.
 *
 * The default window size is 50% of the screen and it changes by 25% on every key repetition,
 * cycling through 50% -> 75% -> 100% -> 25% -> 50%.
 *
 * @param {Corner} corner - The corner or position to move the window to.
 * Can be one of 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'right', 'left', 'top', 'bottom', 'center', 'full'.
 * @param {number} [debounceTimeMs=1000] - The debounce time in milliseconds for repeated keys actions.
 */
export const moveWindowTo = (corner: Corner, debounceTimeMs = 1000) => {
  const now = Date.now();
  const $window = Window.focused();

  // If there is no focused window, return early
  if (!$window) return;

  const $screen = $window.screen().flippedVisibleFrame();

  const screenWidth = $screen.width;
  const screenHeight = $screen.height;

  // Determine the new window size based on the key press count
  let windowSize = 50;
  if (corner === lastKey && (now - lastCallTime) < debounceTimeMs) {
    keyPressCount += 1;
  } else {
    keyPressCount = 1;
  }

  // Cycle window size through 50%, 75%, 100%, 25%
  switch (keyPressCount) {
    case 1:
      windowSize = 50;
      break;
    case 2:
      windowSize = 75;
      break;
    case 3:
      windowSize = 100;
      break;
    case 4:
      windowSize = 25;
      keyPressCount = 0; // Reset count after cycling through all sizes
      break;
  }

  lastKey = corner;
  lastCallTime = now;

  // Calculate window size and position
  let x, y;
  let w = (screenWidth * windowSize) / 100;
  let h = (screenHeight * windowSize) / 100;

  // Determine the top-left corner position based on the desired corner
  switch (corner) {
    case "left":
      x = $screen.x;
      y = $screen.y;
      h = screenHeight; // Full height
      break;
    case "right":
      x = screenWidth - w + $screen.x;
      y = $screen.y;
      h = screenHeight; // Full height
      break;
    case "top":
      x = $screen.x;
      y = $screen.y;
      w = screenWidth; // Full width
      break;
    case "bottom":
      x = $screen.x;
      y = screenHeight - h + $screen.y;
      w = screenWidth; // Full width
      break;
    case "center":
      w = (windowSize / 100) * screenWidth;
      h = (windowSize / 100) * screenHeight;
      x = $screen.x + (screenWidth - w) / 2;
      y = $screen.y + (screenHeight - h) / 2;
      break;
    case "top-left":
      x = $screen.x;
      y = $screen.y;
      break;
    case "top-right":
      x = screenWidth - w + $screen.x;
      y = $screen.y;
      break;
    case "bottom-right":
      x = screenWidth - w + $screen.x;
      y = screenHeight - h + $screen.y;
      break;
    case "bottom-left":
      x = $screen.x;
      y = screenHeight - h + $screen.y;
      break;
    default:
      Phoenix.log("ERROR: Invalid position specified");
      return;
  }

  // Set the new position and size of the window
  $window.setTopLeft({ x, y });
  $window.setSize({
    width: w,
    height: h,
  });
};

/**
 * Minimize all windows except the currently focused window.
 *
 * This function iterates through all open windows and minimizes them, except for the currently focused window.
 * After minimizing, it raises the currently focused window to the front after a brief delay.
 */
export const minimizeAllButCurrent = () => {
  const $currentWindow = Window.focused();

  const $windows = Window.all();
  $windows?.map(($window) => {
    if ($window.hash() !== $currentWindow?.hash()) {
      $window.minimize();
    }
  });

  setTimeout(() => $currentWindow?.raise(), 100);
};

/**
 * Unminimize all windows except the currently focused window.
 *
 * This function iterates through all open windows and unminimizes them, except for the currently focused window.
 * After unminimizing, it raises the currently focused window to the front after a brief delay.
 */
export const unminimizeAllButCurrent = () => {
  const $currentWindow = Window.focused();

  const $windows = Window.all();
  $windows?.map(($window) => {
    if ($window.hash() !== $currentWindow?.hash()) {
      $window.unminimize();
    }
  });

  setTimeout(() => $currentWindow?.raise(), 100);
};

/**
 * Minimize the currently focused window.
 */
export const minimizeCurrent = () => {
  const $currrentApp = App.focused();
  $currrentApp?.windows().map(($app) => $app.minimize());
};

/**
 * Unminimize the currently focused window.
 */
export const unminimizeCurrent = () => {
  const $currrentApp = App.focused();
  $currrentApp?.windows().map(($app) => $app.unminimize());
};

/**
 * Enter fullscreen mode for the currently focused window.
 */
export const enterFullscreen = () => {
  const $currentWindow = Window.focused();
  $currentWindow?.setFullScreen(true);
};

/**
 * Exit fullscreen mode for the currently focused window.
 */
export const exitFullscreen = () => {
  const $currentWindow = Window.focused();
  $currentWindow?.setFullScreen(false);
};
