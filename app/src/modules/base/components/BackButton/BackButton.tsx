import React, { ComponentType } from "react";
import { withRouter } from "react-router";

import Button from "@material-ui/core/Button";

import BackIcon from "@material-ui/icons/ChevronLeft";

import { BackButtonProps } from "./types";

/**
 * Render a button that navigates back one page using React Router.
 */
const BackButtonComponent: React.FC<BackButtonProps> = props => {
  const filteredProps = { ...props };
  delete filteredProps.staticContext;
  return (
    <Button onClick={props.history.goBack} {...filteredProps}>
      <BackIcon />
      <b>Go back</b>
    </Button>
  );
};

export const BackButton = withRouter<
  BackButtonProps,
  ComponentType<BackButtonProps>
>(BackButtonComponent);
