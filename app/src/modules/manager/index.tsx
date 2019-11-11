import React, { useContext } from "react";
import Helmet from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import AppModeContext from "../core/contexts/AppModeContext";
import AuthenticationContext from "../core/contexts/AuthenticationContext";
import { ManagerRaceProvider } from "../core/contexts/RaceContext";

import Protected from "../core/components/Protected";
import NotFoundPage from "../core/pages/NotFoundPage";

import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import ManagerRegistrationsPage from "./pages/ManagerRegistrationsPage";
import ManagerManagersPage from "./pages/ManagerManagersPage";
import ManagerTeamsPage from "./pages/ManagerTeamsPage";
import ManagerNodesPage from "./pages/ManagerNodesPage";
import ManagerSettingsPage from "./pages/ManagerSettingsPage";

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
        <ManagerRaceProvider userId={user.uid} raceId={raceId}>
          <Switch>
            {children}
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </ManagerRaceProvider>
      );
    } else {
      // If there is no race selected, return to the dashboard
      return <Redirect to="/dashboard" />;
    }
  }
  return null;
};

/**
 * This component houses all routes for the app when in manager mode.
 */
const ManagerMode: React.FC = () => {
  return (
    <Protected claims={["manager"]}>
      <Helmet>
        <title>Manage race</title>
      </Helmet>
      <RaceRoutesProvider>
        <Route exact path="/manage">
          <ManagerDashboardPage />
        </Route>
        <Route exact path="/manage/registrations">
          <ManagerRegistrationsPage />
        </Route>
        <Route exact path="/manage/managers">
          <ManagerManagersPage />
        </Route>
        <Route exact path="/manage/teams">
          <ManagerTeamsPage />
        </Route>
        <Route exact path="/manage/nodes">
          <ManagerNodesPage />
        </Route>
        <Route exact path="/manage/settings">
          <ManagerSettingsPage />
        </Route>
      </RaceRoutesProvider>
    </Protected>
  );
};

export default ManagerMode;
