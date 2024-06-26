# Renan Config Phoenix

Configuration for PhoenixJs Window Manager - https://github.com/kasper/phoenix/

## Shortcuts

You can always check and update the shortcuts [here](src/index.ts).

|Keys|Description
|-|-|
"alt" + "cmd" + "keypad."|exist full screen
"alt" + "cmd" + "keypad0"|enter full screen
"alt" + "cmd" + "keypad1"|move window to "bottom-left"
"alt" + "cmd" + "keypad2"|move window to "bottom"
"alt" + "cmd" + "keypad3"|move window to "bottom-right"
"alt" + "cmd" + "keypad4"|move window to "left"
"alt" + "cmd" + "keypad5"|move window to "center"
"alt" + "cmd" + "keypad6"|move window to "right"
"alt" + "cmd" + "keypad7"|move window to "top-left"
"alt" + "cmd" + "keypad8"|move window to "top"
"alt" + "cmd" + "keypad9"|move window to "top-right"
"alt" + "cmd" + "up"|move window to "top"
"alt" + "cmd" + "down"|move window to "bottom"
"alt" + "cmd" + "left"|move window to "left"
"alt" + "cmd" + "right"|move window to "right"
"shift" + "ctrl" + "keypad1"|move window to screen number 1
"shift" + "ctrl" + "keypad2"|move window to screen number 2
"shift" + "ctrl" + "keypad3"|move window to screen number 3
"alt" + "cmd" + "."|move window to next screen
"alt" + "cmd" + ","|move window to previous number
"alt" + "cmd" + "end"|minimize all windows but keep current in open and in focus
"alt" + "cmd" + "home"|unminimize all windows but keep current in focus
"alt" + "cmd" + "pageDown"|minimize app
"alt" + "cmd" + "pageUp"|unminimize app
"alt" + "cmd" + "\"|open iTerm, Slack and Arc Browser

## Installation

1. Be sure to exit PhoenixJs.
2. Be sure to not have any other running configuration as mentioned [here](https://kasper.github.io/phoenix/#javascript-api).
3. Run the following command in your terminal.

```sh
git clone git@github.com:renanborgez/renan-config-phoenix.git ~/.config/phoenix/
```

4. Start Phoenix again.
5. Done!

You should already be able to use this config, test it by pressing `Alt` + `Cmd` + `LeftArrow` your
window should move to the left side and occupy 50% of the screen.

## Extending this configuration

This configuration uses Typescript and NodeJs 20+.

If you open ~/.config/phoenix/ you will see a full typescript project.

You can use the following commands inside the configuration project:

```sh
$ npm install # it will install all dependencies
$ npm run dev # start the watch server and propagate any changes to phoenix immediately as they change
$ npm run build # build the project and after it Phoenix should immediately reload with the new config
```
