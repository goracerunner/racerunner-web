import React, { useContext, useEffect } from "react";

import AppModeContext from "../../../core/contexts/AppModeContext";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const RaceModePage: React.FC = () => {
  const classes = useStyles();
  const { raceId, setMode } = useContext(AppModeContext);

  useEffect(() => {
    // If no raceId is given, change back to the dashboard mode.
    if (!raceId) setMode("dashboard");
  }, [raceId, setMode]);

  return <div className={classes.root}></div>;
};
