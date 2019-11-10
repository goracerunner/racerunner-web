import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    title: {
      marginTop: "3rem",
      marginBottom: "2rem"
    },
    info: {
      marginBottom: "1rem"
    },
    na: {
      display: "flex",
      alignItems: "center"
    },
    icon: {
      marginRight: "0.5rem"
    }
  })
);
