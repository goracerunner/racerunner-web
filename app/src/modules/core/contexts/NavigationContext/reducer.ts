import { Reducer } from "react";

import { Logger } from "../../../../utils";

import {
  NavigationState,
  NavigationAction,
  SetAppAction,
  SetPageAction,
  SetTabAction,
  ExpandAppAction,
  CloseAppAction,
  SetDrawerStateAction
} from "./types";

export const navigationReducer: Reducer<NavigationState, NavigationAction> = (
  state,
  action
) => {
  switch (action.type) {
    // Set the menu's open state
    case "setDrawerState": {
      const open = (action as SetDrawerStateAction).payload;
      return {
        ...state,
        drawerOpen: open
      };
    }

    // Set the selected app as the current app
    case "setApp": {
      const app = (action as SetAppAction).payload;
      return {
        ...state,
        currentApp: app
      };
    }

    // Set the selected page as the current page
    case "setPage": {
      const page = (action as SetPageAction).payload;
      return {
        ...state,
        currentPage: page
      };
    }

    // Set the selected tab as the current tab
    case "setTab": {
      const tab = (action as SetTabAction).payload;
      return {
        ...state,
        currentTab: tab
      };
    }

    // Add an app to the list of expanded apps
    case "expandApp": {
      const app = (action as ExpandAppAction).payload;
      return {
        ...state,
        expandedApps: Array.from(new Set([...state.expandedApps, app]))
      };
    }

    // Remove an app from the list of expanded apps
    case "closeApp": {
      const appToRemove = (action as CloseAppAction).payload;
      return {
        ...state,
        expandedApps: state.expandedApps.filter(app => app !== appToRemove)
      };
    }
  }

  // Warning for action type not recognised
  Logger.warn("NavigationReducer", `Unrecognised action: ${action.type}`);

  // Return the unmodified state
  return state;
};
