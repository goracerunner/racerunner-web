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
