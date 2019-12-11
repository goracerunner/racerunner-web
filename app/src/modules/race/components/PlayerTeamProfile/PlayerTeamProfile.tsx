import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";

import { pluralise } from "../../../../utils/text";

import { PlayerTeamProfileProps } from "./types";
import useStyles from "./styles";

/**
 * This component shows a player's team profile.
 */
export const PlayerTeamProfile: FC<PlayerTeamProfileProps> = ({ team }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.team}>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.heading}
        >
          Your team
        </Typography>
        <Typography variant="h5" className={classes.teamName}>
          <b>{team.name}</b>
        </Typography>
      </div>
      <div className={classes.team}>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.heading}
        >
          Your score
        </Typography>
        <Typography variant="h5">
          <b>{team.points}</b> {pluralise("point", team.points)}
        </Typography>
      </div>
    </>
  );
};
