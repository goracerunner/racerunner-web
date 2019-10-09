import { createMuiTheme } from "@material-ui/core";
import constants from "../../../../../styles/constants";

// Styleshets
import "../../../../../styles/scss/base.scss";

/**
 * Generate a font family CSS property with fallbacks.
 * The primary font will be the name of the font passed.
 */
const generateFonts = (name: string) =>
  [name, '"Helvetica Neue"', "Arial", "sans-serif"].join(",");

const titleFonts = generateFonts("Bangers");
const bodyFonts = generateFonts("Open Sans");

/**
 * Create a new theme with the default look for Race Runner.
 * Pass this object to a `ThemeProvider` component as the `theme` prop.
 */
export default (type: "dark" | "light") =>
  createMuiTheme({
    typography: {
      // Set font family
      fontFamily: bodyFonts,
      h1: {
        fontFamily: titleFonts
      },
      h2: {
        fontFamily: titleFonts
      },
      h3: {
        fontFamily: titleFonts
      }
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
