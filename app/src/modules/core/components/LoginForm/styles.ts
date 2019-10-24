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
      margin: "auto",
      maxWidth: "18rem"
    },
    button: {
      margin: "1rem 0"
    },
    facebook: {
      color: "white",
      background: constants.color.external.facebook,
      "&:hover": {
        background: constants.color.external.facebookDark
      }
    }
  })
);
