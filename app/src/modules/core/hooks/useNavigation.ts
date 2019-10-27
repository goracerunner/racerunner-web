import { useContext, useCallback, useEffect, useState } from "react";

import NavigationContext, {
  createSetDrawerStateAction,
  createExpandAppAction,
  createSetAppAction,
  createSetPageAction,
  createSetTabAction
} from "../contexts/NavigationContext";

import { Logger } from "../../../utils";
import { Nullable } from "../../../types/global";

import { AppName } from "../contexts/NavigationContext/types";
import { TabBar } from "../components/TabBar/types";

import { AppDrawerStateHook } from "./types";

/**
 * This hook grabs the app drawer's state from the
 * `NavigationContext` and returns its state and the
 * memoized forms of the functions to open and close
 * the drawer.
 */
export const useAppDrawerState: AppDrawerStateHook = () => {
  const { drawerOpen, dispatch } = useContext(NavigationContext);

  // Call backs for opening and closing the drawer

  const openDrawer = useCallback(() => {
    dispatch(createSetDrawerStateAction(true));
  }, [dispatch]);

  const closeDrawer = useCallback(() => {
    dispatch(createSetDrawerStateAction(false));
  }, [dispatch]);

  return [drawerOpen, openDrawer, closeDrawer];
};

/**
 * This hook dispatches the current app location and expands
 * the app's menu in the `NavigationContext`.
 */
export const useSetApp = (app: AppName) => {
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(createExpandAppAction(app));
    dispatch(createSetAppAction(app));
    return () => {
      dispatch(createSetAppAction(null));
    };
  }, [dispatch, app]);
};

/**
 * This hook dispatches the current page location in
 * the `NavigationContext`.
 */
export const useSetPage = (page: string) => {
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(createSetPageAction(page));
    return () => {
      dispatch(createSetPageAction(null));
    };
  }, [dispatch, page]);
};

/**
 * This hook dispatches the current sub page location
 * in the `NavigationContext`.
 */
export const useSetTab = (tab: string) => {
  const { dispatch } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(createSetTabAction(tab));
    return () => {
      dispatch(createSetTabAction(null));
    };
  }, [dispatch, tab]);
};

/**
 * Given a list of tabs, check the current navigation
 * context state and get the index of the selected
 * tab if available. If the tab cannot be found, a -1
 * will be returned.
 */
export const useGetTabIndex = (tabs: Array<TabBar>) => {
  const { currentTab } = useContext(NavigationContext);

  // Find the index of the current tab in our list
  let tab = tabs.findIndex(tab => tab.id === currentTab);

  // If we can't find the tab, and it is not an empty tab,
  // log it as an error.
  if (tab === -1 && currentTab !== null)
    Logger.error(
      "UserManagementPage",
      `Tab "${currentTab}" not found`,
      window.location.href
    );

  // Return the tab index
  return tab;
};

/**
 * A convenience hook that returns a redirect path as the first
 * element, and a function to set set the redirect path as the
 * second element. The redirect path is initially `null`, and
 * can be set using the function that is returned.
 * @param path the path to redirect to
 */
export const useRedirect: (
  path: string
) => [Nullable<string>, () => void] = path => {
  const [redirect, setRedirect] = useState<Nullable<string>>(null);

  const setRedirectPath = useCallback(() => {
    setRedirect(path);
  }, [setRedirect, path]);

  return [redirect, setRedirectPath];
};
