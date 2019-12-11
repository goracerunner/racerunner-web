import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    },
    back: {
      marginBottom: theme.spacing(2)
    }
  })
);

export const useCardStyles = makeStyles<Theme>(theme =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2)
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  })
);
