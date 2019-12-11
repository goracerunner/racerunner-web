import React, { FC, useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Redirect } from "react-router";

import { RACE_ERROR } from "../../../../config/snackbarKey";

import AppModeContext from "../../../core/contexts/AppModeContext";
import RaceContext from "../../../core/contexts/RaceContext";

import { useRedirect } from "../../../core/hooks/useNavigation";
import { usePredicateFeedback } from "../../../core/hooks/useFeedbackHooks";

import Loader from "../../../base/components/Loader";

import { RacePageContainerProps } from "./types";

/**
 * This component ensures that child components are only rendered
 * if the race is loaded and retrieved successfully.
 */
export const RacePageContainer: FC<RacePageContainerProps> = ({
  title,
  children
}) => {
  const { raceId } = useContext(AppModeContext);
  const { loading, race } = useContext(RaceContext);

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
    showError(
      error,
      () => Boolean(error),
      () => setRedirect()
    );
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
  }

  return (
    <>
      <Helmet>
        <title>{title ? title : race ? race.name : ""}</title>
      </Helmet>
      {children}
    </>
  );
};
