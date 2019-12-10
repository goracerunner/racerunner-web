import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2)
    },
    formHelperText: {
      marginTop: 0
    },
    label: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    editor: {
      marginBottom: theme.spacing(2)
    }
  })
);
