import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "2rem"
    },
    centered: {
      padding: "0.5rem 2rem 0",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center"
    },
    icon: {
      marginBottom: "0.5rem"
    }
  })
);

export const useCardStyles = makeStyles(
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingBottom: "1rem"
    },
    actions: {
      height: "3rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    content: {
      height: "6rem"
      // overflow: "scroll"
    }
  })
);
