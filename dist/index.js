"use strict";

// src/modules/corners.ts
var lastKey = null;
var lastCallTime = Date.now();
var keyPressCount = 0;
var moveTo = (corner) => {
  const now = Date.now();
  const $window = Window.focused();
  if (!$window) return;
  const $screen = $window.screen().flippedVisibleFrame();
  const screenWidth = $screen.width;
  const screenHeight = $screen.height;
  let windowSize = 50;
  if (corner === lastKey && now - lastCallTime < 1e3) {
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
  let w = screenWidth * windowSize / 100;
  let h = screenHeight * windowSize / 100;
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
      console.log("ERROR: Invalid position specified");
      return;
  }
  $window.setTopLeft({ x, y });
  $window.setSize({
    width: w,
    height: h
  });
};

// src/utils/frame.ts
var frameRatio = (a, b) => {
  const widthRatio = b.width / a.width;
  const heightRatio = b.height / a.height;
  return ({ width, height, x, y }) => {
    width = Math.round(width * widthRatio);
    height = Math.round(height * heightRatio);
    x = Math.round(b.x + (x - a.x) * widthRatio);
    y = Math.round(b.y + (y - a.y) * heightRatio);
    return { width, height, x, y };
  };
};

// src/modules/screen.ts
var toScreen = (screenNumber) => {
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
    height: $newScreenFrame.height
  });
};

// src/index.ts
Phoenix.log("PHOENIX");
Phoenix.set({
  daemon: false,
  openAtLogin: true
});
var CORNER_MODIFIERS = ["alt", "cmd"];
Key.on("keypad7", CORNER_MODIFIERS, () => moveTo("top-left"));
Key.on("keypad8", CORNER_MODIFIERS, () => moveTo("top"));
Key.on("keypad9", CORNER_MODIFIERS, () => moveTo("top-right"));
Key.on("keypad4", CORNER_MODIFIERS, () => moveTo("left"));
Key.on("keypad5", CORNER_MODIFIERS, () => moveTo("center"));
Key.on("keypad6", CORNER_MODIFIERS, () => moveTo("right"));
Key.on("keypad1", CORNER_MODIFIERS, () => moveTo("bottom-left"));
Key.on("keypad2", CORNER_MODIFIERS, () => moveTo("bottom"));
Key.on("keypad3", CORNER_MODIFIERS, () => moveTo("bottom-right"));
Key.on("up", CORNER_MODIFIERS, () => moveTo("top"));
Key.on("down", CORNER_MODIFIERS, () => moveTo("bottom"));
Key.on("left", CORNER_MODIFIERS, () => moveTo("left"));
Key.on("right", CORNER_MODIFIERS, () => moveTo("right"));
var SCREEN_MODIFIERS = ["shift", "cmd"];
Key.on("1", SCREEN_MODIFIERS, () => toScreen(1));
Key.on("2", SCREEN_MODIFIERS, () => toScreen(2));
