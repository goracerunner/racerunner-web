import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem"
    },
    heading: {
      margin: "0.5rem 0"
    },
    paragraph: {
      marginBottom: "1rem"
    },
    section: {
      margin: "1rem 0"
    },
    paper: {
      marginTop: "1rem",
      padding: "0.5rem 2rem",
      [theme.breakpoints.down("xs")]: {
        padding: "0.1rem 1rem"
      }
    }
  })
);
