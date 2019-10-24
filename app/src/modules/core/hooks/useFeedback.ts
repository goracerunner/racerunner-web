import { useSnackbar } from "notistack";

import { Nullable } from "../../../types/global";

import { PromiseFeedbackOptions, FeedbackOptions } from "./types";

/**
 * This hook watches a promise and provides feedback when the promise
 * succeeds or fails. Uses the `notistack` package under the hood.
 * @param options options on whether to display a snackbar on success or fail
 */
export const useFeedbackPromise: <T = any, E = any>(
  options: PromiseFeedbackOptions<T, E>
) => (promise: Nullable<Promise<T>>) => Promise<any> = <T = any, E = any>(
  options: PromiseFeedbackOptions<T, E>
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return async (promise: Nullable<Promise<T>>) => {
    const { onSuccess, onError } = options;
    try {
      // Wait for the promise to resolve.
      const result = await promise;

      // Run success callback
      if (onSuccess && promise) {
        const { message, options } = onSuccess(result!, closeSnackbar);
        enqueueSnackbar(message, options);
      }
    } catch (error) {
      // Run error callback.
      if (onError) {
        const { message, options } = onError(error, closeSnackbar);
        enqueueSnackbar(message, options);
      }
    }
  };
};

/**
 * This hook shows a snackbar message and runs a callback function
 * when a given predicate function evaluates to `true`. Uses the
 * `notistack` package under the hood.
 * @param options options for the snackbar message
 */
export const useFeedback: (
  options: FeedbackOptions
) => (
  message: string,
  predicate: () => boolean,
  callback?: () => void
) => void = options => {
  const { enqueueSnackbar } = useSnackbar();
  return (message, predicate, callback) => {
    // Check if predicate returns true
    if (predicate()) {
      enqueueSnackbar(message, options);
      if (callback) callback();
    }
  };
};
