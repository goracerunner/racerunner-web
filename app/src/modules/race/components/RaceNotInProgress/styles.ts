import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    heading: {
      marginTop: theme.spacing(8)
    },
    subtitle: {
      marginBottom: theme.spacing(1)
    },
    title: {
      marginBottom: theme.spacing(2)
    },
    logo: {
      margin: theme.spacing(6),
      display: "flex",
      justifyContent: "center"
    }
  })
);
