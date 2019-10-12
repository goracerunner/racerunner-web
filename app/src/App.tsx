import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { AuthenticationProvider } from "./modules/core/contexts/AuthenticationContext";
import { AuthorisationProvider } from "./modules/core/contexts/AuthorisationContext";
import { NavigationProvider } from "./modules/core/contexts/NavigationContext";

import DefaultTheme from "./modules/base/components/Theme";
import HeadMeta from "./modules/base/components/HeadMeta";
import ErrorBoundary from "./modules/base/components/ErrorBoundary";
import ScrollToTop from "./modules/base/components/ScrollToTop";

import NotFoundPage from "./modules/core/pages/NotFoundPage";
import PrivacyPage from "./modules/core/pages/PrivacyPage";
import TermsPage from "./modules/core/pages/TermsPage";
import LandingPage from "./modules/core/pages/LandingPage";
import DashboardPage from "./modules/core/pages/DashboardPage";
import LogoutPage from "./modules/core/pages/LogoutPage";
import ForbiddenPage from "./modules/core/pages/ForbiddenPage";

const Providers: FC = ({ children }) => {
  return (
    <AuthenticationProvider>
      <AuthorisationProvider>
        <NavigationProvider>
          <SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>
        </NavigationProvider>
      </AuthorisationProvider>
    </AuthenticationProvider>
  );
};

const App: FC = () => {
  return (
    <>
      <HeadMeta />
      <DefaultTheme>
        <ErrorBoundary>
          <Providers>
            <BrowserRouter>
              <ScrollToTop>
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/dashboard" component={DashboardPage} />
                  <Route exact path="/privacy" component={PrivacyPage} />
                  <Route exact path="/terms" component={TermsPage} />
                  <Route exact path="/logout" component={LogoutPage} />
                  <Route exact path="/forbidden" component={ForbiddenPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </ScrollToTop>
            </BrowserRouter>
          </Providers>
        </ErrorBoundary>
      </DefaultTheme>
    </>
  );
};

export default App;
