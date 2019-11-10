import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Helmet from "react-helmet";

import { RACE_ERROR } from "../../../../config/snackbarKey";

import { usePredicateFeedback } from "../../../core/hooks/useFeedbackHooks";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useRedirect } from "../../../core/hooks/useNavigation";

import AppModeContext from "../../../core/contexts/AppModeContext";
import RaceContext from "../../../core/contexts/RaceContext";

import RegistrationForm from "../../components/RegistrationForm";

/**
 * Render a registration form for a race. The raceId should be set in
 * the `AppModeContext`. If no raceId is given, the app will be switched
 * back to `dashboard` mode.
 */
export const RegistrationPage: React.FC = () => {
  const { raceId } = useContext(AppModeContext);
  const { loading, registered, race } = useContext(RaceContext);

  const store = useFirestore();
  const showError = usePredicateFeedback("error", RACE_ERROR);
  const [redirect, setRedirect] = useRedirect("/dashboard");
  const [error, setError] = useState("");

  useEffect(() => {
    // If no raceId is given, change back to the dashboard mode.
    showError(
      "No race selected for registration.",
      () => Boolean(!loading && !raceId),
      () => setRedirect()
    );
  }, [showError, loading, raceId, setRedirect]);

  useEffect(() => {
    // If there is an error, go back to the dashboard.
    showError(error, () => Boolean(error), () => setRedirect());
  }, [showError, error, setRedirect]);

  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  if (!loading) {
    if (!race) {
      // Throw an error if the race data failed to load.
      if (!error) {
        setError(`Race data failed to load.`);
      }
    } else if (registered) {
      // If you are already registered, redirect to dashboard
      return <Redirect to="/dashboard" push />;
    } else {
      return (
        <>
          <Helmet>
            <title>{race.name}</title>
          </Helmet>
          <RegistrationForm
            race={race}
            onRegister={(key: string, registration: any) => {
              if (raceId) {
                store
                  .collection("races")
                  .doc(raceId)
                  .collection("registrations")
                  .doc(key)
                  .set(registration);
              }
            }}
          />
        </>
      );
    }
  }

  // This shouldn't happen.
  return null;
};
