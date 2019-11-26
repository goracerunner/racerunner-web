import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    back: {
      marginBottom: theme.spacing(1)
    }
  })
);
