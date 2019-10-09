import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      marginTop: "5rem"
    },
    container: {
      marginTop: "3rem",
      marginBottom: "12rem",
      paddingLeft: "7.4rem",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "10rem",
        paddingLeft: "3rem"
      }
    },
    title: {
      marginBottom: "0.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.6rem"
      }
    }
  })
);
