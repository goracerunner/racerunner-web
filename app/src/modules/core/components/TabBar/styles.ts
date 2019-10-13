import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    scroller: {
      width: "10rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    indicator: {
      backgroundColor: "white"
    },
    tab: {
      textTransform: "none"
    },
    notFound: {
      fontWeight: "bold",
      color: theme.palette.error.light
    }
  })
);
