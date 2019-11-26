import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    profile: {
      padding: theme.spacing(2),
      position: "relative"
    },
    more: {
      position: "absolute",
      right: theme.spacing(1)
    }
  })
);
