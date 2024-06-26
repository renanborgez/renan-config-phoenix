/**
 * Safely execute a function and catch any errors.
 *
 * @param {Function} fn - The function to be executed safely.
 * @returns {Function} A curried function that takes the arguments for the original function.
 */
export const safeExecute = (fn: Function) => (...args: any[]) => {
  try {
    return fn(...args);
  } catch (error) {
    Phoenix.log('ERROR: ', JSON.stringify(error));
    return undefined;
  }
};
