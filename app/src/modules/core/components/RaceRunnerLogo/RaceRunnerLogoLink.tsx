import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import RaceRunnerLogo from ".";
import { useLinkStyles } from "./styles";

/**
 * Renders the Race Runner Logo as a link to the home directory.
 */
export const RaceRunnerLogoLink: React.FC = () => {
  const classes = useLinkStyles();
  return (
    <Button component={Link} to="/" className={classes.button}>
      <div>
        <RaceRunnerLogo />{" "}
      </div>
    </Button>
  );
};
