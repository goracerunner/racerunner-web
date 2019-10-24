import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";

import { RACE_ERROR } from "../../../../config/snackbarKey";

import Loader from "../../../base/components/Loader";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { usePredicateFeedback } from "../../../core/hooks/useFeedbackHooks";
import AppModeContext from "../../../core/contexts/AppModeContext";
import RaceContext from "../../../core/contexts/RaceContext";

import RegistrationForm from "../../components/RegistrationForm";
import RaceDashboard from "../../components/RaceDashboard";

/**
 * This component displays the appropriate components
 * when the app is in race mode.
 */
export const RaceModePage: React.FC = () => {
  const { raceId, setMode } = useContext(AppModeContext);
  const { loading, registered, race } = useContext(RaceContext);

  const store = useFirestore();
  const [error, setError] = useState("");
  const showError = usePredicateFeedback("error", RACE_ERROR);

  useEffect(() => {
    // If no raceId is given, change back to the dashboard mode.
    showError(
      "Race selection failed.",
      () => Boolean(!raceId),
      () => setMode("dashboard")
    );
  }, [showError, raceId, setMode]);

  useEffect(() => {
    // If there is an error, go back to the dashboard.
    showError(error, () => Boolean(error), () => setMode("dashboard"));
  }, [showError, error, setMode]);

  let content: JSX.Element = <Loader message="Fetching data..." />;

  if (!loading) {
    if (!race) {
      // Throw an error if the race data failed to load.
      if (!error) {
        setError(`Race data failed to load.`);
      }
    } else if (!registered) {
      // Show registration fields.
      content = (
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
      );
    } else {
      // Show race dashboard.
      content = <RaceDashboard race={race} />;
    }
  }

  return (
    <>
      <Helmet>
        <title>{race ? race.name : ""}</title>
      </Helmet>
      {content}
    </>
  );
};
