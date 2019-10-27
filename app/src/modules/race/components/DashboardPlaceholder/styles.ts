import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      marginBottom: "1rem"
    },
    info: {
      marginBottom: "0.5rem"
    }
  })
);
