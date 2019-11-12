import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import constants from "../../../../styles/constants";
import { generateFonts, BODY_FONT } from "../../../../utils/fonts";

import { LoaderProps } from "./types";

export default makeStyles<Theme, LoaderProps>(
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "20vh 0"
    },
    message: {
      marginTop: "1.5rem",
      textAlign: "center"
    },
    text: ({ hideBackground }) => ({
      color: hideBackground ? "#6e6e6e" : "#e6e6e6",
      marginBottom: "1rem"
    }),
    loader: {
      display: "grid"
    },
    loaderItem: {
      gridColumn: 1,
      gridRow: 1,
      margin: "auto"
    },
    spinner: {
      color: constants.color.secondary
    },
    unstyledTitle: {
      fontFamily: generateFonts(BODY_FONT)
    }
  })
);
