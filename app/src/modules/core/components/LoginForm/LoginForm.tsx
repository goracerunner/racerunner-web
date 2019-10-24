import React, { FC, useState, useCallback } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

import ClearIcon from "@material-ui/icons/Clear";
import FacebookIcon from "../icons/FacebookIcon";

import { useBooleanState } from "../../../base/hooks/useStateFactory";

import * as snackbarKey from "../../../../config/snackbarKey";

import { LoginFormProps } from "./types";
import useStyles from "./styles";

const LOGIN_TIMEOUT = 1500000 * 1000;

/**
 * The Login Form displays the controls for a user to log.
 *
 * A function to actually initiate the login flow for the specified
 * providers should be passed as a prop to the component. Otherwise,
 * clicking the buttons on this component won't actually start the
 * login flow.
 */
export const LoginForm: FC<LoginFormProps> = ({ startLogin }) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isLoading, showLoading, hideLoading] = useBooleanState(false);
  const [error, setError] = useState("");

  // This function clears local state and starts the login flow.
  const startLoginHandler = useCallback(() => {
    // Clear errors and show loading
    setError("");
    closeSnackbar(snackbarKey.LOGIN_ERROR);

    showLoading();
    enqueueSnackbar("Signing in...", {
      key: snackbarKey.LOGIN_LOADING,
      persist: true
    });

    // Log in
    if (startLogin) startLogin();

    // Show error if page does not redirect
    setTimeout(() => {
      hideLoading();
      closeSnackbar(snackbarKey.LOGIN_LOADING);

      // setError("Sorry, but your request timed out. Please try again.");
      enqueueSnackbar("Sorry, but your request timed out. Please try again.", {
        key: snackbarKey.LOGIN_ERROR,
        variant: "error",
        persist: true,
        action: (
          <IconButton onClick={() => closeSnackbar(snackbarKey.LOGIN_ERROR)}>
            <ClearIcon />
          </IconButton>
        )
      });
    }, LOGIN_TIMEOUT);
  }, [
    setError,
    closeSnackbar,
    showLoading,
    enqueueSnackbar,
    startLogin,
    hideLoading
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          className={clsx(classes.button, classes.facebook)}
          variant="contained"
          disabled={isLoading}
          onClick={startLoginHandler}
        >
          {isLoading && (
            <CircularProgress
              size="1.5rem"
              color="secondary"
              className={classes.loading}
            />
          )}
          <FacebookIcon />
          Facebook
        </Button>
      </div>
      {error && (
        <div>
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        </div>
      )}
      <Typography variant="caption" color="textSecondary">
        By continuing, you are indicating that you accept our{" "}
        <Link className="link" to="/terms">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link className="link" to="/privacy">
          Privacy Policy
        </Link>
        .
      </Typography>
    </div>
  );
};
