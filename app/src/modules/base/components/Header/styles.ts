import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
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
    titleText: {
      paddingRight: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.5rem"
      }
    },
    logo: {
      marginRight: "1rem",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0.5rem"
      }
    }
  })
);
