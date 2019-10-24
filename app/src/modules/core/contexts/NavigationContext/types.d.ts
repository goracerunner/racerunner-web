import { Dispatch, ReducerAction, Reducer } from "react";

import { Nullable } from "../../../../types/global";

export type NavigationActionType =
  | "setDrawerState"
  | "setApp"
  | "setPage"
  | "setTab"
  | "expandApp"
  | "closeApp";

export type AppName = "admin" | "worship" | "checkin" | "roster";

export interface NavigationState {
  drawerOpen: boolean;
  currentApp: Nullable<AppName>;
  currentPage: Nullable<string>;
  currentTab: Nullable<string>;
  expandedApps: Array<AppName>;
}

export interface NavigationAction<P = any> {
  type: NavigationActionType;
  payload: P;
}

export interface NavigationContextState<
  R extends Reducer<NavigationState, NavigationAction>
> extends NavigationState {
  dispatch: Dispatch<ReducerAction<R>>;
}

// Actions

export interface SetDrawerStateAction extends NavigationAction<boolean> {
  type: "setDrawerState";
}

export interface SetAppAction extends NavigationAction<Nullable<AppName>> {
  type: "setApp";
}

export interface SetPageAction extends NavigationAction<Nullable<string>> {
  type: "setPage";
}

export interface SetTabAction extends NavigationAction<Nullable<string>> {
  type: "setTab";
}

export interface ExpandAppAction extends NavigationAction<AppName> {
  type: "expandApp";
}

export interface CloseAppAction extends NavigationAction<AppName> {
  type: "closeApp";
}
