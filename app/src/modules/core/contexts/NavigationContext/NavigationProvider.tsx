import React, { useReducer } from "react";

import NavigationContext from ".";
import { navigationReducer } from "./reducer";

/**
 * The navigation provider hydrates the context with the
 * state of the user's navigation and the dispatch function
 * to udpate the state. Under the hood, a `useReducer` hook
 * is used to track and apply updates to the navigation state.
 */
export const NavigationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, {
    drawerOpen: false,
    currentApp: null,
    currentPage: null,
    currentTab: null,
    expandedApps: []
  });

  return (
    <NavigationContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
