import React, { FC } from "react";

import RaceNotInProgress from "../RaceNotInProgress";

import { PlayerDashboardProps } from "./types";
import useStyles from "./styles";

/**
 * TODO: Add description
 */
export const PlayerDashboard: FC<PlayerDashboardProps> = ({ race }) => {
  const classes = useStyles();

  if (race.status !== "in_progress") {
    return <RaceNotInProgress race={race} />;
  }

  return null;
};
