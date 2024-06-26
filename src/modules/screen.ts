import { frameRatio } from "utils/frame";

type ScreenNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Move the window to next screen (uses horizontal order)
 */
export const toNextScreen = () => {
  const $window = Window.focused();

  if (!$window) {
    return;
  }

  const $oldScreen = $window.screen();
  const $newScreen = $oldScreen.next();
  const $newScreenFrame = $newScreen.flippedVisibleFrame();

  const ratio = frameRatio(
    $oldScreen.flippedVisibleFrame(),
    $newScreen.flippedVisibleFrame()
  );

  $window.setFrame(ratio($window.frame()));
  $window.setSize({
    width: $newScreenFrame.width,
    height: $newScreenFrame.height,
  });
};

/**
 * Move the window to specific screen (uses horizontal order)
 *
 * @param {ScreenNumber} screenNumber Index 1 based (example: First screen will have index 1)
 */
export const toScreen = (screenNumber: ScreenNumber) => {
  const $screens = Screen.all().sort((a, b) => a.frame().x - b.frame().x);
  const $window = Window.focused();

  if ($screens.length === 0 || !$window) {
    return;
  }

  const $oldScreen = $window.screen();
  const $newScreen = $screens[screenNumber - 1];
  const $newScreenFrame = $newScreen.flippedVisibleFrame();

  const ratio = frameRatio(
    $oldScreen.flippedVisibleFrame(),
    $newScreen.flippedVisibleFrame()
  );

  $window.setFrame(ratio($window.frame()));
  $window.setSize({
    width: $newScreenFrame.width,
    height: $newScreenFrame.height,
  });
};
