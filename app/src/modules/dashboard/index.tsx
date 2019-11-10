import React from "react";
import { Switch, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";

import NotFoundPage from "../core/pages/NotFoundPage";

/**
 * This component renders the subpages for dashboard mode.
 */
const DashboardMode: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard">
        <DashboardPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default DashboardMode;
