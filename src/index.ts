import { moveWindowTo } from "modules/corners";
import { toNextScreen, toScreen } from "modules/screen";

Phoenix.log('Renan Config Phoenix');

// Configuration
Phoenix.set({
  daemon: false,
  openAtLogin: true,
});

/**
 * Corner key bindings
 */
const CORNER_MODIFIERS: Phoenix.ModifierKey[] = ["alt", "cmd"];

Key.on("keypad7", CORNER_MODIFIERS, () => moveWindowTo("top-left"));
Key.on("keypad8", CORNER_MODIFIERS, () => moveWindowTo("top"));
Key.on("keypad9", CORNER_MODIFIERS, () => moveWindowTo("top-right"));

Key.on("keypad4", CORNER_MODIFIERS, () => moveWindowTo("left"));
Key.on("keypad5", CORNER_MODIFIERS, () => moveWindowTo("center"));
Key.on("keypad6", CORNER_MODIFIERS, () => moveWindowTo("right"));

Key.on("keypad1", CORNER_MODIFIERS, () => moveWindowTo("bottom-left"));
Key.on("keypad2", CORNER_MODIFIERS, () => moveWindowTo("bottom"));
Key.on("keypad3", CORNER_MODIFIERS, () => moveWindowTo("bottom-right"));

Key.on("up", CORNER_MODIFIERS, () => moveWindowTo("top"));
Key.on("down", CORNER_MODIFIERS, () => moveWindowTo("bottom"));
Key.on("left", CORNER_MODIFIERS, () => moveWindowTo("left"));
Key.on("right", CORNER_MODIFIERS, () => moveWindowTo("right"));

/**
 * Screen key bindings
 */
const SCREEN_MODIFIERS: Phoenix.ModifierKey[] = ["shift", "cmd"];

Key.on("1", SCREEN_MODIFIERS, () => toScreen(1));
Key.on("2", SCREEN_MODIFIERS, () => toScreen(2));
