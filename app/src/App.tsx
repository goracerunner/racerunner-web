import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { SnackbarProvider } from "notistack";

import { AuthenticationProvider } from "./modules/core/contexts/AuthenticationContext";
import { AuthorisationProvider } from "./modules/core/contexts/AuthorisationContext";
import { NavigationProvider } from "./modules/core/contexts/NavigationContext";
import { AppModeProvider } from "./modules/core/contexts/AppModeContext";

import { useAppDrawerState } from "./modules/core/hooks/useNavigation";

import DefaultTheme from "./modules/base/components/Theme";
import HeadMeta from "./modules/base/components/HeadMeta";
import ErrorBoundary from "./modules/base/components/ErrorBoundary";
import ScrollToTop from "./modules/base/components/ScrollToTop";

import Protected from "./modules/core/components/Protected";
import AppDrawer from "./modules/core/components/AppDrawer";
import AppBar from "./modules/core/components/AppBar";

import NotFoundPage from "./modules/core/pages/NotFoundPage";
import PrivacyPage from "./modules/core/pages/PrivacyPage";
import TermsPage from "./modules/core/pages/TermsPage";
import LandingPage from "./modules/core/pages/LandingPage";
import LogoutPage from "./modules/core/pages/LogoutPage";
import ForbiddenPage from "./modules/core/pages/ForbiddenPage";

import DashboardMode from "./modules/dashboard";
import AdminMode from "./modules/admin";
import ManagerMode from "./modules/manager";
import RaceMode from "./modules/race";

const App: FC = () => {
  return (
    <DefaultTheme>
      <ErrorBoundary>
        <HeadMeta />
        <BrowserRouter>
          <AuthenticationProvider>
            <AuthorisationProvider>
              <NavigationProvider>
                <AppModeProvider>
                  <SnackbarProvider maxSnack={5}>
                    <ScrollToTop>
                      <Routes />
                    </ScrollToTop>
                  </SnackbarProvider>
                </AppModeProvider>
              </NavigationProvider>
            </AuthorisationProvider>
          </AuthenticationProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </DefaultTheme>
  );
};

const Routes: FC = () => (
  <Switch>
    <Route exact path="/">
      <LandingPage />
    </Route>
    <Route exact path="/privacy">
      <PrivacyPage />
    </Route>
    <Route exact path="/terms">
      <TermsPage />
    </Route>
    <Route
      path={[
        "/logout",
        "/forbidden",
        "/dashboard",
        "/admin",
        "/manage",
        "/race"
      ]}
    >
      <ProtectedRoutes />
    </Route>
    <Route>
      <NotFoundPage />
    </Route>
  </Switch>
);

const ProtectedRoutes = () => {
  const [menuOpen, openDrawer, closeDrawer] = useAppDrawerState();
  return (
    <Protected>
      <AppDrawer open={menuOpen} onClose={closeDrawer}>
        <AppBar onDrawerOpen={openDrawer} />
        <Switch>
          <Route exact path="/logout">
            <LogoutPage />
          </Route>
          <Route exact path="/forbidden">
            <ForbiddenPage />
          </Route>
          <Route path="/dashboard">
            <DashboardMode />
          </Route>
          <Route path="/admin">
            <AdminMode />
          </Route>
          <Route path="/manage">
            <ManagerMode />
          </Route>
          <Route path="/race">
            <RaceMode />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </AppDrawer>
    </Protected>
  );
};

export default App;
