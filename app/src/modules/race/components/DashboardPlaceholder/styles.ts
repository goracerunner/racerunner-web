import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    heading: {
      marginTop: "1rem"
    },
    title: {
      marginBottom: "1rem"
    },
    info: {
      marginBottom: "0.5rem"
    }
  })
);
