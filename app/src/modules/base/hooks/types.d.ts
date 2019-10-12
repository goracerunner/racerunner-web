export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface UseStateFactory<T> {
  (defaultState: T): [T, () => void, () => void];
}

export interface ToggleUseStateFactory<T> {
  (defaultState: T): [T, () => void];
}
