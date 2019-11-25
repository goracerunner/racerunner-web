import { Nullable } from "../../../types/global";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface UseStateFactory<T> {
  (defaultState: T): [T, () => void, () => void];
}

export interface ToggleUseStateFactory<T> {
  (defaultState: T): [T, () => void];
}

export interface UseMapStateFactory {
  <T extends any>(defafultState?: { [key: string]: Nullable<T> }): [
    { [key: string]: Nullable<T> },
    (key: string, value: Nullable<T>) => void,
    (value: { [key: string]: Nullable<T> }) => void
  ];
}
