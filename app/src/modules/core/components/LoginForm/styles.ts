import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import constants from "../../../../styles/constants";

export default makeStyles<Theme>(
  createStyles({
    root: {
      position: "relative"
    },
    loading: {
      position: "absolute"
    },
    buttons: {
      display: "flex",
      flexDirection: "column",
      margin: "1rem auto",
      maxWidth: "18rem",
      position: "relative",
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      marginBottom: "0.5rem",
      width: "100%"
    },
    facebook: {
      color: "white",
      background: constants.color.external.facebook,
      "&:hover": {
        background: constants.color.external.facebookDark
      }
    },
    google: {}
  })
);
