import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      textAlign: "center",
      marginBottom: "1rem"
    },
    button: {
      margin: "0.5rem 0"
    },
    fields: {
      marginBottom: "2rem"
    },
    blurb: {
      padding: "1rem",
      marginBottom: "1rem"
    },
    form: {
      padding: "2rem",
      marginBottom: "4rem",
      [theme.breakpoints.down("sm")]: {
        padding: "1rem"
      }
    },
    loader: {
      position: "absolute"
    }
  })
);
