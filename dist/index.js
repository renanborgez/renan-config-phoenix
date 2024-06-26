"use strict";

// src/modules/sizing.ts
var lastKey = null;
var lastCallTime = Date.now();
var keyPressCount = 0;
var moveWindowTo = (corner, debounceTimeMs = 1e3) => {
  const now = Date.now();
  const $window = Window.focused();
  if (!$window) return;
  const $screen = $window.screen().flippedVisibleFrame();
  const screenWidth = $screen.width;
  const screenHeight = $screen.height;
  let windowSize = 50;
  if (corner === lastKey && now - lastCallTime < debounceTimeMs) {
    keyPressCount += 1;
  } else {
    keyPressCount = 1;
  }
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
      keyPressCount = 0;
      break;
  }
  lastKey = corner;
  lastCallTime = now;
  let x, y;
  let w = screenWidth * windowSize / 100;
  let h = screenHeight * windowSize / 100;
  switch (corner) {
    case "left":
      x = $screen.x;
      y = $screen.y;
      h = screenHeight;
      break;
    case "right":
      x = screenWidth - w + $screen.x;
      y = $screen.y;
      h = screenHeight;
      break;
    case "top":
      x = $screen.x;
      y = $screen.y;
      w = screenWidth;
      break;
    case "bottom":
      x = $screen.x;
      y = screenHeight - h + $screen.y;
      w = screenWidth;
      break;
    case "center":
      w = windowSize / 100 * screenWidth;
      h = windowSize / 100 * screenHeight;
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
  $window.setTopLeft({ x, y });
  $window.setSize({
    width: w,
    height: h
  });
};
var minimizeAllButCurrent = () => {
  const $currentWindow = Window.focused();
  const $windows = Window.all();
  $windows?.map(($window) => {
    if ($window.hash() !== $currentWindow?.hash()) {
      $window.minimize();
    }
  });
  setTimeout(() => $currentWindow?.raise(), 100);
};
var unminimizeAllButCurrent = () => {
  const $currentWindow = Window.focused();
  const $windows = Window.all();
  $windows?.map(($window) => {
    if ($window.hash() !== $currentWindow?.hash()) {
      $window.unminimize();
    }
  });
  setTimeout(() => $currentWindow?.raise(), 100);
};
var minimizeCurrent = () => {
  const $currrentApp = App.focused();
  $currrentApp?.windows().map(($app) => $app.minimize());
};
var unminimizeCurrent = () => {
  const $currrentApp = App.focused();
  $currrentApp?.windows().map(($app) => $app.unminimize());
};
var enterFullscreen = () => {
  const $currentWindow = Window.focused();
  $currentWindow?.setFullScreen(true);
};
var exitFullscreen = () => {
  const $currentWindow = Window.focused();
  $currentWindow?.setFullScreen(false);
};

// src/modules/application.ts
var openApps = (appNames = []) => {
  appNames.map((appName) => {
    App.launch(appName)?.focus();
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
var toScreen = (screen) => {
  const $screens = Screen.all().sort((a, b) => a.frame().x - b.frame().x);
  const $window = Window.focused();
  if ($screens.length === 0 || !$window) {
    return;
  }
  let $newScreen;
  const $oldScreen = $window.screen();
  if (typeof screen === "number") {
    $newScreen = $screens[screen - 1];
  } else {
    $newScreen = screen === "next" ? $oldScreen.next() : $oldScreen.previous();
  }
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

// src/utils/guard.ts
var safeExecute = (fn) => (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    Phoenix.log("ERROR: ", JSON.stringify(error));
    return void 0;
  }
};

// src/index.ts
var moveWindowTo2 = safeExecute(moveWindowTo);
var toScreen2 = safeExecute(toScreen);
var minimizeAllButCurrent2 = safeExecute(minimizeAllButCurrent);
var unminimizeAllButCurrent2 = safeExecute(unminimizeAllButCurrent);
var minimizeCurrent2 = safeExecute(minimizeCurrent);
var unminimizeCurrent2 = safeExecute(unminimizeCurrent);
var enterFullscreen2 = safeExecute(enterFullscreen);
var exitFullscreen2 = safeExecute(exitFullscreen);
var openApps2 = safeExecute(openApps);
Phoenix.log("Renan Config Phoenix Loaded");
Phoenix.set({
  daemon: false,
  openAtLogin: true
});
var MODIFIER = ["alt", "cmd"];
Key.on("keypad0", MODIFIER, () => enterFullscreen2());
Key.on("keypad.", MODIFIER, () => exitFullscreen2());
Key.on("keypad1", MODIFIER, () => moveWindowTo2("bottom-left"));
Key.on("keypad2", MODIFIER, () => moveWindowTo2("bottom"));
Key.on("keypad3", MODIFIER, () => moveWindowTo2("bottom-right"));
Key.on("keypad4", MODIFIER, () => moveWindowTo2("left"));
Key.on("keypad5", MODIFIER, () => moveWindowTo2("center"));
Key.on("keypad6", MODIFIER, () => moveWindowTo2("right"));
Key.on("keypad7", MODIFIER, () => moveWindowTo2("top-left"));
Key.on("keypad8", MODIFIER, () => moveWindowTo2("top"));
Key.on("keypad9", MODIFIER, () => moveWindowTo2("top-right"));
Key.on("up", MODIFIER, () => moveWindowTo2("top"));
Key.on("down", MODIFIER, () => moveWindowTo2("bottom"));
Key.on("left", MODIFIER, () => moveWindowTo2("left"));
Key.on("right", MODIFIER, () => moveWindowTo2("right"));
Key.on("keypad1", ["shift", "ctrl"], () => toScreen2(1));
Key.on("keypad2", ["shift", "ctrl"], () => toScreen2(2));
Key.on("keypad3", ["shift", "ctrl"], () => toScreen2(3));
Key.on(".", MODIFIER, () => toScreen2("next"));
Key.on(",", MODIFIER, () => toScreen2("previous"));
Key.on("end", MODIFIER, () => minimizeAllButCurrent2());
Key.on("home", MODIFIER, () => unminimizeAllButCurrent2());
Key.on("pageDown", MODIFIER, () => minimizeCurrent2());
Key.on("pageUp", MODIFIER, () => unminimizeCurrent2());
Key.on("\\", MODIFIER, () => openApps2(["iTerm", "Slack", "Arc"]));
