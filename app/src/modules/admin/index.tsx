import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "../core/pages/NotFoundPage";

import Protected from "../core/components/Protected";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminRacesPage from "./pages/AdminRacesPage";

/**
 * This component houses all routes for the app when in admin mode.
 */
const AdminMode: React.FC = () => {
  return (
    <Protected claims={["admin"]}>
      <Switch>
        <Route exact path="/admin">
          <AdminDashboardPage />
        </Route>
        <Route exact path="/admin/users">
          <AdminUsersPage />
        </Route>
        <Route exact path="/admin/races">
          <AdminRacesPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Protected>
  );
};

export default AdminMode;
