import { useSnackbar } from "notistack";

import { Nullable } from "../../../types";

import { PromiseFeedbackOptions } from "./types";

/**
 * This hook watches a promise and provides feedback when the promise
 * succeeds or fails. Uses the `notistack` package under the hood.
 * @param options options on whether to display a snackbar on success or fail
 */
export const useFeedback: <T = any, E = any>(
  options: PromiseFeedbackOptions<T, E>
) => (promise: Nullable<Promise<T>>) => Promise<any> = <T = any, E = any>(
  options: PromiseFeedbackOptions<T, E>
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return async (promise: Nullable<Promise<T>>) => {
    const { onSuccess, onError } = options;
    try {
      const result = await promise;
      if (onSuccess && promise) {
        const { message, options } = onSuccess(result!, closeSnackbar);
        enqueueSnackbar(message, options);
      }
    } catch (error) {
      if (onError) {
        const { message, options } = onError(error, closeSnackbar);
        enqueueSnackbar(message, options);
      }
    }
  };
};
