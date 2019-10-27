import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import NotFoundPage from "../core/pages/NotFoundPage";

import AppModeContext from "../core/contexts/AppModeContext";
import { RaceProvider } from "../core/contexts/RaceContext";
import AuthenticationContext from "../core/contexts/AuthenticationContext";

import RaceDashboardPage from "./pages/RaceDashboardPage";

/**
 * This component displays the appropriate components
 * when the app is in race mode.
 */
const RaceMode: React.FC = () => {
  const { raceId } = useContext(AppModeContext);
  const { user } = useContext(AuthenticationContext);

  return (
    <Switch>
      <Route exact path="/race">
        {() => {
          // Only render the race dashboard if there is a race selected and there is a user.
          if (user) {
            if (raceId) {
              return (
                <RaceProvider userId={user.uid} raceId={raceId}>
                  <RaceDashboardPage />
                </RaceProvider>
              );
            } else {
              // If there is no race selected, return to the dashboard
              return <Redirect to="/dashboard" />;
            }
          }
          return null;
        }}
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default RaceMode;
