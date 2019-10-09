import React, { Reducer } from "react";

import { Logger } from "../../../../utils";

import {
  NavigationContextState,
  NavigationState,
  NavigationAction
} from "./types";

/**
 * The navigation context stores the user's current
 * location within the app. This is mainly to be used
 * for controlling the look of the UI based on the
 * user's current location.
 */
const NavigationContext = React.createContext<
  NavigationContextState<Reducer<NavigationState, NavigationAction>>
>({
  drawerOpen: false,
  currentApp: null,
  currentPage: null,
  currentTab: null,
  expandedApps: [],
  dispatch: () => {
    Logger.error("NavigationContext", "No dispatch available");
  }
});

export default NavigationContext;

export { NavigationProvider } from "./NavigationProvider";
export * from "./actions";
