import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    title: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1rem"
    },
    header: {
      marginTop: "0"
    },
    subtitle: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem"
    }
  })
);
