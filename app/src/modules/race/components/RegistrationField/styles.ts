import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    field: {
      marginBottom: "1.2rem"
    },
    list: {
      marginTop: "1rem"
    }
  })
);
