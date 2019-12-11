import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import AppModeContext from "../core/contexts/AppModeContext";
import AuthenticationContext from "../core/contexts/AuthenticationContext";
import { UserRaceProvider } from "../core/contexts/RaceContext";

import NotFoundPage from "../core/pages/NotFoundPage";

import RaceDashboardPage from "./pages/RaceDashboardPage";
import RaceNodesPage from "./pages/RaceNodesPage";
import RaceNodesNewPage from "./pages/RaceNodesNewPage";
import RaceNodesPendingPage from "./pages/RaceNodesPendingPage";
import RaceNodesCompletedPage from "./pages/RaceNodesCompletedPage";
import RaceViewNodePage from "./pages/RaceViewNodePage";

/**
 * This component provides race information to the routes (children) if
 * there is a race selected. If there is no race, it will redirect to
 * the dashboard.
 */
const RaceRoutesProvider: React.FC = ({ children }) => {
  const { raceId } = useContext(AppModeContext);
  const { user } = useContext(AuthenticationContext);

  // Only render the routes if there is a race selected and there is a user.
  if (user) {
    if (raceId) {
      return (
        <UserRaceProvider userId={user.uid} raceId={raceId}>
          <Switch>
            {children}
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </UserRaceProvider>
      );
    } else {
      // If there is no race selected, return to the dashboard
      return <Redirect to="/dashboard" />;
    }
  }
  return null;
};

/**
 * This component displays the appropriate components
 * when the app is in race mode.
 */
const RaceMode: React.FC = () => {
  return (
    <RaceRoutesProvider>
      <Route exact path="/race">
        <RaceDashboardPage />
      </Route>
      <Route exact path="/race/nodes">
        <RaceNodesPage />
      </Route>
      <Route exact path="/race/nodes/new">
        <RaceNodesNewPage />
      </Route>
      <Route exact path="/race/nodes/pending">
        <RaceNodesPendingPage />
      </Route>
      <Route exact path="/race/nodes/completed">
        <RaceNodesCompletedPage />
      </Route>
      <Route exact path="/race/nodes/:nodeId">
        <RaceViewNodePage />
      </Route>
    </RaceRoutesProvider>
  );
};

export default RaceMode;
