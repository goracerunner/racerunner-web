import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    paper: {
      position: "relative",
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    regoPaper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    action: {
      position: "absolute",
      right: theme.spacing(2)
    },
    status: {
      marginTop: theme.spacing(2)
    },
    buffer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3)
    }
  })
);
