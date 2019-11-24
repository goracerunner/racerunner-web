import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    title: {
      marginTop: "3rem",
      marginBottom: "2rem"
    },
    subtitle: {
      marginTop: "0.5rem"
    },
    container: {
      marginBottom: "3rem"
    }
  })
);
