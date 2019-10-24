import { useState, useCallback } from "react";

import {
  UseStateFactory,
  ToggleUseStateFactory,
  UseMapStateFactory
} from "./types";

/**
 * Create a `useState` hook that returns the state,
 * a function to set the state as true, and a function
 * to set the state as false.
 * @param defaultState initial value for the state
 */
export const useBooleanState: UseStateFactory<boolean> = (
  defaultState: boolean
) => {
  const [state, setState] = useState<boolean>(defaultState);
  const setTrue = useCallback(() => setState(true), [setState]);
  const setFalse = useCallback(() => setState(false), [setState]);
  return [state, setTrue, setFalse];
};

/**
 * Create a `useState` hook that returns the state,
 * and a function that toggles the state.
 * @param defaultState initial value for the state
 */
export const useToggleBooleanState: ToggleUseStateFactory<boolean> = (
  defaultState: boolean
) => {
  const [state, setState] = useState<boolean>(defaultState);
  const toggle = useCallback(() => setState(!state), [setState, state]);
  return [state, toggle];
};

/**
 * Create a `useState` hook that initialises a map that can be
 * used to store arbitrary values. Returns the map and a setter
 * function that sets only the specified field.
 * @param defaultState initial value for the state
 */
export const useMapState: UseMapStateFactory = (
  defaultState: {
    [key: string]: any;
  } = {}
) => {
  const [values, setValues] = useState<{ [key: string]: any }>(defaultState);
  const setValue = (key: string, value: any) => {
    setValues({
      ...values,
      [key]: value
    });
  };
  return [values, setValue, setValues];
};
