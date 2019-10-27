import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "../core/pages/NotFoundPage";

import Protected from "../core/components/Protected";

import AdminDashboardPage from "./pages/AdminDashboardPage";

/**
 * This component houses all routes for the app when in admin mode.
 */
const AdminMode: React.FC = () => {
  return (
    <Protected claims={["admin"]}>
      <Switch>
        <Route exact path="/admin" component={AdminDashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Protected>
  );
};

export default AdminMode;
