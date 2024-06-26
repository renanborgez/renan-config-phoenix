/**
 * @module
 *
 * This module is responsible for moving the window to a different screen.
 */

import { frameRatio } from "utils/frame";

type ScreenNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type ScreenDirection = 'previous' | 'next';

/**
 * Move the focused window to a different screen, either by screen number or direction.
 *
 * This function can move the focused window to a specific screen by its index (1-based) or
 * to the next or previous screen in the horizontal order.
 *
 * @param {ScreenNumber | ScreenDirection} screen - The target screen specified by index or direction.
 *   - `ScreenNumber`: The 1-based index of the target screen (e.g., 1 for the first screen).
 *   - `ScreenDirection`: The direction to move the window ('next' or 'previous').
 */
export const toScreen = (screen: ScreenNumber | ScreenDirection) => {
  const $screens = Screen.all().sort((a, b) => a.frame().x - b.frame().x);
  const $window = Window.focused();

  // Return early if there are no screens or no window is focused
  if ($screens.length === 0 || !$window) {
    return;
  }

  let $newScreen;
  const $oldScreen = $window.screen();

  // Determine the target screen based on the provided parameter
  if (typeof screen === 'number') {
    $newScreen = $screens[screen - 1];
  } else {
    $newScreen = screen === 'next' ? $oldScreen.next() : $oldScreen.previous();
  }

  const $newScreenFrame = $newScreen.flippedVisibleFrame();

  // Calculate the frame ratio to maintain the window's aspect ratio across screens
  const ratio = frameRatio(
    $oldScreen.flippedVisibleFrame(),
    $newScreen.flippedVisibleFrame()
  );

  // Move and resize the window to the new screen
  $window.setFrame(ratio($window.frame()));
  $window.setSize({
    width: $newScreenFrame.width,
    height: $newScreenFrame.height,
  });
};
