import React, { FC } from "react";

import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

import { RACE_STATUS_INFO } from ".";
import { RaceStatusProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a label that explains the current race status.
 */
export const RaceStatus: FC<RaceStatusProps> = ({ status, className }) => {
  const statusInfo = RACE_STATUS_INFO.find(s => s.id === status);

  const classes = useStyles({
    label: "white",
    background: statusInfo ? statusInfo.color : ""
  });

  return (
    <Tooltip title={statusInfo ? statusInfo.description : ""}>
      <Chip
        label={statusInfo ? statusInfo.label : ""}
        className={className}
        classes={{
          root: classes.root,
          label: classes.label
        }}
      />
    </Tooltip>
  );
};
