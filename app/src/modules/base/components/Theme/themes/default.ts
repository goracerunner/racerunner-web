import { createMuiTheme } from "@material-ui/core";

import {
  generateFonts,
  TITLE_FONT,
  BODY_FONT
} from "../../../../../utils/fonts";
import constants from "../../../../../styles/constants";

// Styleshets
import "../../../../../styles/scss/base.scss";

const titleFonts = generateFonts(TITLE_FONT);
const bodyFonts = generateFonts(BODY_FONT);

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
