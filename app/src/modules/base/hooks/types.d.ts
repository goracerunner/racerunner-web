export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface UseStateFactory<T> {
  (defaultState: T): [T, () => void, () => void];
}

export interface ToggleUseStateFactory<T> {
  (defaultState: T): [T, () => void];
}

export interface UseMapStateFactory {
  (defafultState?: { [key: string]: any }): [
    { [key: string]: any },
    (key: string, value: any) => void,
    (value: { [key: string]: any }) => void
  ];
}
