import { OptionsObject } from "notistack";

import { Nullable, Maybe } from "../../../types/global";

export interface AppDrawerStateHook {
  (): [boolean, () => void, () => void];
}

export interface UseTransitionOptions {
  /**
   * The delay before starting the transition in ms.
   */
  delay?: number;

  /**
   * The duration of the transition in ms.
   */
  duration?: number;
}

export interface UseTransitionHookResult {
  in: boolean;
  style: object;
  timeout: object;
}

export interface PromiseFeedbackOptions<T = any, E = any> {
  /**
   * Pass a function used to create a snackbar if the promise succeeds.
   */
  onSuccess?: (
    /**
     * The result of the promise
     */
    result: T,
    /**
     * Callback function used to close a snackbar.
     */
    closeSnackbar: (key?: Maybe<string | number>) => void
  ) => {
    message: React.ReactNode;
    options?: OptionsObject;
  };
  /**
   * Pass a function used to create a snackbar if the promise fails.
   */
  onError?: (
    /**
     * The error thrown by the promise.
     */
    error: E,
    /**
     * Callback function used to close a snackbar.
     */
    closeSnackbar: (key?: Maybe<string | number>) => void
  ) => {
    message: React.ReactNode;
    options?: OptionsObject;
  };
}
