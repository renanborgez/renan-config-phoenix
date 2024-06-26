/**
 * Launch and focus specified applications.
 *
 * This function takes an array of application names, launches each application, and brings them to the foreground.
 * It is useful for quickly setting up a working environment by opening and focusing all necessary applications.
 *
 * Latest app in the appNames will be the one with focus.
 */
export const openApps = (appNames: string[] = []) => {
  appNames.map((appName) => {
    App.launch(appName)?.focus();
  });
};
