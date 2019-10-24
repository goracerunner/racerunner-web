import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { HeaderProps } from "./types";

export default makeStyles<Theme, HeaderProps>(theme =>
  createStyles({
    heading: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "8rem",
      [theme.breakpoints.down("xs")]: {
        marginTop: "6rem"
      }
    },
    title: {
      display: "flex",
      margin: "1rem",
      alignItems: "center"
    },
    titleText: ({ reduced }) => ({
      paddingRight: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: reduced ? "2.5rem" : "3.5rem"
      }
    }),
    logo: ({ reduced }) => ({
      marginRight: reduced ? "0.5rem" : "1rem",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0.5rem"
      }
    })
  })
);
