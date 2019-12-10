import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    profile: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      position: "relative",
      minHeight: "5rem"
    },
    more: {
      position: "absolute",
      right: theme.spacing(1)
    }
  })
);
