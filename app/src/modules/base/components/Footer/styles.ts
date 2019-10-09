import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import constants from "../../../../styles/constants";

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      color: constants.color.footer,
      textAlign: "center",
      padding: "4rem 2rem 1rem",
      [theme.breakpoints.down("sm")]: {
        padding: "3rem 2rem 1rem"
      }
    },
    spacer: {
      padding: "0 1.5rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0 0.5rem"
      }
    },
    links: {
      marginBottom: "1rem",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    bottom: {
      marginBottom: "1rem"
    },
    divider: {
      backgroundColor: "rgba(150, 150, 150, 0.5)",
      margin: "1.5rem auto",
      maxWidth: "30rem",
      [theme.breakpoints.down("sm")]: {
        margin: "1rem auto"
      }
    }
  })
);
