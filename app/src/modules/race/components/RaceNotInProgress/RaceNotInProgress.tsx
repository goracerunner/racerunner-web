import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Logo from "../../../base/components/Logo";

import { Nullable } from "../../../../types/global";

import { RaceNotInProgressProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a message to show the user when the race is not in progress.
 */
export const RaceNotInProgress: FC<RaceNotInProgressProps> = ({ race }) => {
  const classes = useStyles();

  let content: Nullable<JSX.Element> = null;

  switch (race.status) {
    case "registration_open":
    case "registration_closed": {
      content = (
        <>
          <Typography variant="h6" className={classes.subtitle}>
            <b>Thanks for your registration!</b>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            It's been received successfully. Be sure to come back to this page
            during the race – this is where you'll see your challenges and
            progress for your team.
          </Typography>
          <div className={classes.logo}>
            <Logo baseSize={150} />
          </div>
        </>
      );
      break;
    }

    case "closed":
    case "results": {
      content = (
        <>
          <Typography variant="h6" className={classes.subtitle}>
            <b>Thanks for your participation!</b>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            It's been a wild ride. We hope you enjoyed the race. Your game
            master will announce the results!
          </Typography>
          <div className={classes.logo}>
            <Logo baseSize={150} />
          </div>
        </>
      );
      break;
    }
  }

  return (
    <Container maxWidth="md">
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.heading}
      >
        Welcome to
      </Typography>
      <Typography variant="h3" className={classes.title}>
        {race.name}
      </Typography>
      {content}
    </Container>
  );
};
