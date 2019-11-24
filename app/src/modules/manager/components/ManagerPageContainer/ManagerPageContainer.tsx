import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import RaceContext from "../../../core/contexts/RaceContext";

import Loader from "../../../base/components/Loader";

import { ManagerPageContainerProps } from "./types";
import useStyles from "./styles";

/**
 * This component is used as a template to render the pages
 * in the manager view. It shows a loader when the race data
 * is loading and provides a standardised title.
 */
export const ManagerPageContainer: FC<ManagerPageContainerProps> = ({
  title,
  subtitle,
  maxWidth = "md",
  children
}) => {
  const classes = useStyles();
  const { loading, race } = useContext(RaceContext);

  if (loading) {
    return <Loader message="Loading race..." />;
  }

  if (!race) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxWidth={maxWidth} className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4">
          <b>{title}</b>
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="subtitle2"
          color="textSecondary"
        >
          {subtitle ? subtitle : `for ${race.name}`}
        </Typography>
      </div>
      {children}
    </Container>
  );
};
