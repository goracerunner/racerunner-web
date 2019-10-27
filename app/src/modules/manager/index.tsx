import React from "react";
import { Switch, Route } from "react-router-dom";

import Protected from "../core/components/Protected";
import NotFoundPage from "../core/pages/NotFoundPage";

import ManagerDashboardPage from "./pages/ManagerDashboardPage";

/**
 * This component houses all routes for the app when in manager mode.
 */
const ManagerMode: React.FC = () => {
  return (
    <Protected claims={["manager"]}>
      <Switch>
        <Route exact path="/manage">
          <ManagerDashboardPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Protected>
  );
};

export default ManagerMode;
