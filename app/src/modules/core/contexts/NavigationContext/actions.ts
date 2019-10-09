import { Nullable } from "../../../../types";

import {
  SetDrawerStateAction,
  SetAppAction,
  AppName,
  SetPageAction,
  SetTabAction,
  ExpandAppAction,
  CloseAppAction
} from "./types";

// Action creators

export const createSetDrawerStateAction = (payload: boolean) =>
  ({
    type: "setDrawerState",
    payload
  } as SetDrawerStateAction);

export const createSetAppAction = (payload: Nullable<AppName>) =>
  ({
    type: "setApp",
    payload
  } as SetAppAction);

export const createSetPageAction = (payload: Nullable<string>) =>
  ({
    type: "setPage",
    payload
  } as SetPageAction);

export const createSetTabAction = (payload: Nullable<string>) =>
  ({
    type: "setTab",
    payload
  } as SetTabAction);

export const createExpandAppAction = (payload: Nullable<AppName>) =>
  ({
    type: "expandApp",
    payload
  } as ExpandAppAction);

export const createCloseAppAction = (payload: Nullable<AppName>) =>
  ({
    type: "closeApp",
    payload
  } as CloseAppAction);
