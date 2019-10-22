import { useEffect, useState, useCallback } from "react";

import { Nullable } from "../../../types/global";

/**
 * This hook stores a value in local storage with the
 * specified key.
 */
export const useLocalStorage: (
  key: string,
  defaultValue: Nullable<string>
) => [
  Nullable<string>,
  (value: Nullable<string>) => void,
  (key: string) => void
] = (key, defaultValue) => {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Load data from local storage
    if (!loaded) {
      setValue(window.localStorage.getItem(key));
      setLoaded(true);
    }

    // On value change, update local storage
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value!);
    }
  }, [loaded, setLoaded, value, setValue, key]);

  const clearValue = useCallback(() => window.localStorage.removeItem(key), [
    key
  ]);

  return [value, setValue, clearValue];
};
