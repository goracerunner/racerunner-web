import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1)
    },
    divider: {
      margin: theme.spacing(4)
    },
    noTeam: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  })
);
