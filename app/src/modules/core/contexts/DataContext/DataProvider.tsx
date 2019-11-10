import React from "react";

import DataContext from ".";
import { DataProviderProps } from "./types";

/**
 * This component takes in the arguments returned when reading
 * a Firebase document or collection (using `useDocument` or
 * `useCollection`) and provides it through context.
 */
export const DataProvider = function<T>({
  children,
  loading,
  error,
  data
}: DataProviderProps<T>) {
  return (
    <DataContext.Provider
      value={{
        contextExists: true,
        loading,
        error,
        data
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
