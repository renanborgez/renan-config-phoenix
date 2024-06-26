/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Safely execute a function and catch any errors.
 */
export const safeExecute = <T extends (...args: any[]) => any>(fn: T) =>
  (...args: Parameters<T>): ReturnType<T> => {
  try {
    return fn(...args);
  } catch (error) {
    Phoenix.log('ERROR: ', JSON.stringify(error));
    return undefined as ReturnType<T>;
  }
};
