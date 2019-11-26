import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    list: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxHeight: "15rem",
      overflowY: "scroll"
    },
    avatarIcon: {
      minWidth: 45
    },
    avatar: {
      width: "2rem",
      height: "2rem"
    }
  })
);
