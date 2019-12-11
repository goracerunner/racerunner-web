import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    team: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    heading: {
      marginBottom: theme.spacing(1)
    },
    teamName: {
      textTransform: "uppercase"
    }
  })
);
