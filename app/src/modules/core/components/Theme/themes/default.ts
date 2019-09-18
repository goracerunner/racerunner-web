import { createMuiTheme } from "@material-ui/core";
import constants from "../../../../../styles/constants";

// Styleshets
import "../../../../../styles/base.scss";
import "../../../../../styles/fonts.scss";
import "../../../../../styles/links.scss";

/**
 * Create a new theme with the default look for Race Runner.
 * Pass this object to a `ThemeProvider` component as the `theme` prop.
 */
export default (type: "dark" | "light") =>
  createMuiTheme({
    typography: {
      // Set font family
      fontFamily: ["Open Sans", '"Helvetica Neue"', "Arial", "sans-serif"].join(
        ","
      )
    },
    // Set the theme colours
    palette: {
      type,
      primary: {
        main: constants.color.primary
      },
      secondary: {
        main: constants.color.secondary
      },
      error: {
        main: constants.color.error
      },
      background: {
        default: constants.color.background
      }
    }
  });
