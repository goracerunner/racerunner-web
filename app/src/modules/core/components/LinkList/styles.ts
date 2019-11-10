import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    empty: {
      marginBottom: "10rem"
    },
    card: {
      height: "8rem",
      overflow: "hidden",
      paddingRight: "1rem",
      [theme.breakpoints.down("xs")]: {
        height: "6rem",
        paddingRight: "3rem"
      }
    },
    content: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    icon: {
      marginRight: "0.5rem"
    },
    arrow: {
      position: "absolute",
      right: "1rem",
      bottom: "1rem"
    },
    title: {
      display: "flex"
    }
  })
);
