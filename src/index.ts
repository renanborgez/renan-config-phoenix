import {
  moveWindowTo as moveWindowToUnsafe,
  minimizeAllButCurrent as minimizeAllButCurrentUnsafe,
  unminimizeAllButCurrent as unminimizeAllButCurrentUnsafe,
  minimizeCurrent as minimizeCurrentUnsafe,
  unminimizeCurrent as unminimizeCurrentUnsafe,
  enterFullscreen as enterFullscreenUnsafe,
  exitFullscreen as exitFullscreenUnsafe,
} from "modules/sizing";
import { openApps as openAppsUnsafe
} from "modules/application";
import { toScreen as toScreenUnsafe } from "modules/screen";
import { safeExecute } from "utils/guard";

// TODO: Make the safeExecute function integrated with the modules functions and avoid this chunk of code
const moveWindowTo = safeExecute(moveWindowToUnsafe);
const toScreen = safeExecute(toScreenUnsafe);
const minimizeAllButCurrent = safeExecute(minimizeAllButCurrentUnsafe);
const unminimizeAllButCurrent = safeExecute(unminimizeAllButCurrentUnsafe);
const minimizeCurrent = safeExecute(minimizeCurrentUnsafe);
const unminimizeCurrent = safeExecute(unminimizeCurrentUnsafe);
const enterFullscreen = safeExecute(enterFullscreenUnsafe);
const exitFullscreen = safeExecute(exitFullscreenUnsafe);
const openApps = safeExecute(openAppsUnsafe);

Phoenix.log("Renan Config Phoenix Loaded");

// Configuration
Phoenix.set({
  daemon: false,
  openAtLogin: true,
});

const MODIFIER: Phoenix.ModifierKey[] = ["alt", "cmd"];

/**
 * Window sizing key bindings
 */
// Keypad numbers
Key.on("keypad0", MODIFIER, () => enterFullscreen());
Key.on("keypad.", MODIFIER, () => exitFullscreen());

Key.on("keypad1", MODIFIER, () => moveWindowTo("bottom-left"));
Key.on("keypad2", MODIFIER, () => moveWindowTo("bottom"));
Key.on("keypad3", MODIFIER, () => moveWindowTo("bottom-right"));

Key.on("keypad4", MODIFIER, () => moveWindowTo("left"));
Key.on("keypad5", MODIFIER, () => moveWindowTo("center"));
Key.on("keypad6", MODIFIER, () => moveWindowTo("right"));

Key.on("keypad7", MODIFIER, () => moveWindowTo("top-left"));
Key.on("keypad8", MODIFIER, () => moveWindowTo("top"));
Key.on("keypad9", MODIFIER, () => moveWindowTo("top-right"));

// Arrows
Key.on("up", MODIFIER, () => moveWindowTo("top"));
Key.on("down", MODIFIER, () => moveWindowTo("bottom"));
Key.on("left", MODIFIER, () => moveWindowTo("left"));
Key.on("right", MODIFIER, () => moveWindowTo("right"));

/**
 * Screen key bindings
 */
Key.on("keypad1", ["shift", "ctrl"], () => toScreen(1));
Key.on("keypad2", ["shift", "ctrl"], () => toScreen(2));
Key.on("keypad3", ["shift", "ctrl"], () => toScreen(3));

Key.on(".", MODIFIER, () => toScreen("next"));
Key.on(",", MODIFIER, () => toScreen("previous"));

/**
 * Window sizing key bindings
 */
Key.on("end", MODIFIER, () => minimizeAllButCurrent());
Key.on("home", MODIFIER, () => unminimizeAllButCurrent());
Key.on("pageDown", MODIFIER, () => minimizeCurrent());
Key.on("pageUp", MODIFIER, () => unminimizeCurrent());

/**
 * App key bindings
 */
Key.on("\\", MODIFIER, () => openApps(["iTerm", "Slack", "Arc"]));
