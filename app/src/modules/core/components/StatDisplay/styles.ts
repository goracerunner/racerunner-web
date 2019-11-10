import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { generateFonts, BODY_FONT } from "../../../../utils/fonts";

export default makeStyles<Theme>(
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    loading: {
      marginTop: "1rem"
    },
    icon: {
      marginBottom: "0.5rem"
    },
    title: {
      fontFamily: generateFonts(BODY_FONT)
    }
  })
);
