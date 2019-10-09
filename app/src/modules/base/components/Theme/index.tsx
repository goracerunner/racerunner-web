import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import defaultTheme from "./themes/default";

/**
 * The default theme provider.
 */
const DefaultTheme: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <ThemeProvider theme={defaultTheme("light")}>
    <CssBaseline />
    {children || null}
  </ThemeProvider>
);

export default DefaultTheme;

/**
 * Dark theme provider.
 */
export const DarkTheme: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <ThemeProvider theme={defaultTheme("dark")}>
    <CssBaseline />
    {children || null}
  </ThemeProvider>
);
