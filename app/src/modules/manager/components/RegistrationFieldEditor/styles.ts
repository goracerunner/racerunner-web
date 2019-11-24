import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    details: {
      position: "relative",
      width: "100%"
    },
    error: {
      marginTop: theme.spacing(1)
    },
    edit: {
      position: "absolute",
      right: 0,
      bottom: 0
    },
    editIcon: {
      height: theme.spacing(3),
      width: theme.spacing(3),
      marginRight: theme.spacing(1)
    }
  })
);
