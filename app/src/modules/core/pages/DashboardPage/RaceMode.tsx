import React, { FC, useContext, useEffect } from "react";
import AppModeContext from "../../contexts/AppModeContext";

export const RaceMode: FC = () => {
  const { raceId, setMode } = useContext(AppModeContext);

  useEffect(() => {
    // If no raceId is given, change back to the dashboard mode.
    if (!raceId) setMode("dashboard");
  }, [raceId, setMode]);

  return null;
};
