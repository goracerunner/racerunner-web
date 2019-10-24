import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import constants from "../../../../styles/constants";

export default makeStyles<Theme>(theme =>
  createStyles({
    heading: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "8rem",
      [theme.breakpoints.down("xs")]: {
        marginTop: "4rem"
      }
    },
    title: {
      display: "flex",
      margin: "1rem",
      alignItems: "center"
    },
    titleText: {
      paddingRight: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.5rem"
      }
    },
    logo: {
      marginRight: "1rem",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0.5rem"
      }
    },
    subtitle: {
      textAlign: "center",
      padding: "0 1.5rem"
    },
    signIn: {
      textAlign: "center",
      margin: "3rem auto",
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: `${constants.color.neutral}44`,
      maxWidth: "22rem"
    }
  })
);
