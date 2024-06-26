import { moveWindowTo as moveWindowToUnsafe } from "modules/corners";
import { toScreen as toScreenUnsafe } from "modules/screen";
import { safeExecute } from "utils/guard";

const moveWindowTo = safeExecute(moveWindowToUnsafe);
const toScreen = safeExecute(toScreenUnsafe);

Phoenix.log("Renan Config Phoenix Loaded");

// Configuration
Phoenix.set({
  daemon: false,
  openAtLogin: true,
});

/**
 * Corner key bindings
 */

// Keypad numbers
Key.on("keypad7", ["alt", "cmd"], () => moveWindowTo("top-left"));
Key.on("keypad8", ["alt", "cmd"], () => moveWindowTo("top"));
Key.on("keypad9", ["alt", "cmd"], () => moveWindowTo("top-right"));

Key.on("keypad4", ["alt", "cmd"], () => moveWindowTo("left"));
Key.on("keypad5", ["alt", "cmd"], () => moveWindowTo("center"));
Key.on("keypad6", ["alt", "cmd"], () => moveWindowTo("right"));

Key.on("keypad1", ["alt", "cmd"], () => moveWindowTo("bottom-left"));
Key.on("keypad2", ["alt", "cmd"], () => moveWindowTo("bottom"));
Key.on("keypad3", ["alt", "cmd"], () => moveWindowTo("bottom-right"));

// Arrows
Key.on("up", ["alt", "cmd"], () => moveWindowTo("top"));
Key.on("down", ["alt", "cmd"], () => moveWindowTo("bottom"));
Key.on("left", ["alt", "cmd"], () => moveWindowTo("left"));
Key.on("right", ["alt", "cmd"], () => moveWindowTo("right"));

/**
 * Screen key bindings
 */
Key.on("1", ["alt", "cmd"], () => toScreen(1));
Key.on("2", ["alt", "cmd"], () => toScreen(2));
Key.on("3", ["alt", "cmd"], () => toScreen(3));

Key.on(".", ["alt", "cmd"], () => toScreen("next"));
Key.on(",", ["alt", "cmd"], () => toScreen("previous"));
