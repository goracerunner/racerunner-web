import React, { FC } from "react";

import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { RaceStatusProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a label that explains the current race status.
 */
export const RaceStatus: FC<RaceStatusProps> = ({ status, className }) => {
  let text = "";
  let label = "";
  let tooltip = "";
  let background = "";

  switch (status) {
    case "registration_open": {
      text = "Registration open";
      label = "white";
      tooltip = "Users can join the race and register.";
      background = green[500];
      break;
    }
    case "registration_closed": {
      text = "Registration closed";
      label = "white";
      tooltip = "Users cannot join the race.";
      background = red[500];
      break;
    }
    case "in_progress": {
      text = "In progress";
      label = "white";
      tooltip = "Participants can access the race nodes and give responses.";
      background = orange[500];
      break;
    }
    case "results": {
      text = "Results";
      label = "white";
      tooltip = "Participants can view the race results.";
      background = blue[500];
      break;
    }
    case "closed": {
      text = "Closed";
      label = "white";
      tooltip = "Participants can view the race but cannot interact with it.";
      background = blueGrey[500];
      break;
    }
  }

  const classes = useStyles({ label, background });

  return (
    <Tooltip title={tooltip}>
      <Chip
        label={text}
        className={className}
        classes={{
          root: classes.root,
          label: classes.label
        }}
      />
    </Tooltip>
  );
};
