import React from "react";

import { DataContextState } from "./types";

/**
 * The data context provides children with access to the
 * data passed to the provider.
 */
const DataContext = React.createContext<DataContextState>({
  contextExists: false,
  loading: true,
  data: null,
  error: null
});

export default DataContext;

export { DataProvider } from "./DataProvider";
