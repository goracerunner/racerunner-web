import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1)
    }
  })
);
