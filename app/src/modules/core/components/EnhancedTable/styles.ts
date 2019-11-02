import {
  makeStyles,
  createStyles,
  Theme,
  lighten
} from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%"
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: "auto"
    }
  })
);

export const useToolbarStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display: "flex",
      justifyContent: "space-between"
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark
          }
  })
);
