import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import Logo from ".";
import { useLinkStyles } from "./styles";

/**
 * Renders the Logo as a link to the home directory.
 */
export const LogoLink: React.FC = () => {
  const classes = useLinkStyles();
  return (
    <Button component={Link} to="/" className={classes.button}>
      <div>
        <Logo />{" "}
      </div>
    </Button>
  );
};
