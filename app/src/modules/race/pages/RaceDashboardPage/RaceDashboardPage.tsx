import React, { FC, useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Redirect } from "react-router";

import { RACE_ERROR } from "../../../../config/snackbarKey";

import Loader from "../../../base/components/Loader";
import { useRedirect } from "../../../core/hooks/useNavigation";
import { usePredicateFeedback } from "../../../core/hooks/useFeedbackHooks";
import AppModeContext from "../../../core/contexts/AppModeContext";
import RaceContext from "../../../core/contexts/RaceContext";
import DashboardPlaceholder from "../../components/DashboardPlaceholder";

import RegistrationPage from "../RegistrationPage";

import { RaceDashboardPageProps } from "./types";

/**
 * This component shows a dashboard for the currently selected race.
 */
export const RaceDashboardPage: FC<RaceDashboardPageProps> = () => {
  const { raceId } = useContext(AppModeContext);
  const { loading, registered, race } = useContext(RaceContext);

  const [error, setError] = useState("");
  const [redirect, setRedirect] = useRedirect("/dashboard");
  const showError = usePredicateFeedback("error", RACE_ERROR);

  useEffect(() => {
    // If no raceId is given, change back to the dashboard mode.
    showError(
      "Race selection failed.",
      () => Boolean(!raceId),
      () => setRedirect()
    );
  }, [showError, raceId, setRedirect]);

  useEffect(() => {
    // If there is an error, go back to the dashboard.
    showError(error, () => Boolean(error), () => setRedirect());
  }, [showError, error, setRedirect]);

  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  if (loading) {
    return <Loader message="Loading race..." />;
  }

  if (!race) {
    // Throw an error if the race data failed to load.
    if (!error) {
      setError(`Race data failed to load.`);
    }
  } else if (!registered) {
    // Show the registration page if not registered
    return <RegistrationPage />;
  }

  return (
    <>
      <Helmet>
        <title>{race ? race.name : "Dashboard"}</title>
      </Helmet>
      {race && <DashboardPlaceholder race={race} />}
    </>
  );
};
