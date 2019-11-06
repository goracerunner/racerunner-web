import {
  makeStyles,
  createStyles,
  Theme,
  lighten
} from "@material-ui/core/styles";

import { EnhancedTableProps } from "./types";

export default makeStyles<Theme, EnhancedTableProps<any>>(
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
    },
    loading: {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    },
    loader: ({ rowsPerPage }) => ({
      position: "absolute",
      top: `calc(${rowsPerPage} * 1.5rem)`
    })
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
