import React from "react";
import clsx from "clsx";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fade from "@material-ui/core/Fade";

import { useTransition } from "../../../core/hooks/useTransitions";

import Background from "../Background";
import Logo from "../Logo";

import { LoaderProps } from "./types";
import useStyles from "./styles";

/**
 * Render a loader that fills and is centered in a container.
 */
export const Loader: React.FC<LoaderProps> = props => {
  const classes = useStyles(props);

  const {
    title,
    message,
    hideBackground,
    hideSpinner,
    unstyledTitle,
    animated
  } = props;

  const zoom = useTransition(
    animated ? { delay: 100, duration: 300 } : { duration: 0 }
  );

  return (
    <div className={classes.root}>
      {!hideBackground && <Background />}
      <Fade {...zoom}>
        <div className={classes.loader}>
          <CircularProgress
            size={100}
            className={clsx(classes.spinner, classes.loaderItem)}
            variant={hideSpinner ? "static" : "indeterminate"}
          />
          <Logo inverted className={classes.loaderItem} baseSize={60} />
        </div>
      </Fade>
      <Zoom {...zoom}>
        <div className={classes.message}>
          <Typography
            variant="h3"
            className={clsx(classes.text, {
              [classes.styledTitle]: !unstyledTitle
            })}
          >
            {title}
          </Typography>
          <Typography variant="body2" className={classes.text}>
            {message}
          </Typography>
        </div>
      </Zoom>
    </div>
  );
};

Loader.defaultProps = {
  title: "RACE RUNNER",
  message: "Patience is a virtue.",
  hideSpinner: false,
  hideBackground: false,
  unstyledTitle: false
};
