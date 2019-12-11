import React, { FC, useContext } from "react";

import RaceContext from "../../../core/contexts/RaceContext";

import RacePageContainer from "../../components/RacePageContainer";
import PlayerDashboard from "../../components/PlayerDashboard";
import RegistrationPage from "../RegistrationPage";

import { Nullable } from "../../../../types/global";

import { RaceDashboardPageProps } from "./types";

/**
 * This component shows a dashboard for the currently selected race.
 */
export const RaceDashboardPage: FC<RaceDashboardPageProps> = () => {
  const { loading, registered, race } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (!loading && race) {
    if (!registered) {
      // Show the registration page if not registered
      if (race.status === "registration_open") {
        content = <RegistrationPage />;
      }
    } else if (race) {
      // Otherwise, show the dashboard
      content = <PlayerDashboard race={race} />;
    }
  }

  return <RacePageContainer title="Dashboard">{content}</RacePageContainer>;
};
