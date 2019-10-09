import React from "react";
import uuid from "uuid/v4";

import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Clear";

import * as snackbarKey from "../../../config/snackbarKey";
import { Nullable } from "../../../types";

import { useFeedback } from "./useFeedback";
import { PromiseFeedbackOptions } from "./types";

/**
 * This hook assumes the promise fulfils some action and presents
 * a feedback snackbar on success and failure with a custom message.
 *
 * If the promise is successful, a snackbar is shown with the custom
 * success message if given. A success snackbar will NOT be shown if
 * no success message is given.
 *
 * If an error occurs, the last segment of the error (split by colon)
 * will be shown, along with a custom prefix if given.
 *
 * @param successMessage The message to show on a successful save.
 * @param errorMessagePrefix The message to show preceeding the error.
 */
export const useActionFeedback = (
  successMessage?: Nullable<string>,
  errorMessagePrefix?: string
) => {
  const options: PromiseFeedbackOptions = {};

  if (successMessage) {
    const key = `${snackbarKey.SAVE_SUCCESS}${uuid()}`;
    options.onSuccess = (value, close) => ({
      message: successMessage,
      options: {
        key,
        autoHideDuration: 1500,
        variant: "success",
        action: (
          <IconButton onClick={() => close(key)}>
            <CloseIcon />
          </IconButton>
        )
      }
    });
  }

  options.onError = (error, close) => {
    const errors = error.toString().split(":");
    const key = `${snackbarKey.SAVE_ERROR}${uuid()}`;
    return {
      message: `${errorMessagePrefix ? `${errorMessagePrefix}: ` : ""}${
        errors[errors.length - 1]
      }`,
      options: {
        key,
        variant: "error",
        autoHideDuration: 3000,
        action: (
          <IconButton onClick={() => close(key)}>
            <CloseIcon />
          </IconButton>
        )
      }
    };
  };

  return useFeedback(options);
};
