import { OptionsObject } from "notistack";

import { Nullable, Maybe } from "../../../types";

export interface AuthHook {
  (): [Nullable<firebase.auth.IdTokenResult>, () => void];
}

export interface AppDrawerStateHook {
  (): [boolean, () => void, () => void];
}

export type BatchGetHookReturnType<T> = [
  (key: string) => void,
  { [key: string]: T },
  { [key: string]: boolean },
  { [key: string]: any }
];

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
