import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { LinkCardProps } from "./types";

export default makeStyles<Theme, LinkCardProps>(theme =>
  createStyles({
    empty: {
      marginBottom: "10rem"
    },
    card: ({ description }) => ({
      height: description ? "8rem" : "5rem",
      overflow: "hidden",
      paddingRight: "1rem",
      [theme.breakpoints.down("xs")]: {
        height: "6rem",
        paddingRight: "3rem"
      }
    }),
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
