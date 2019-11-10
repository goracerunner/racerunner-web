import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    root: {
      marginBottom: "2rem"
    },
    nameLabel: {
      display: "flex",
      alignItems: "center"
    },
    avatar: {
      marginRight: "0.5rem",
      width: "2rem",
      height: "2rem"
    },
    cancel: {
      position: "absolute",
      right: "1rem",
      top: "1.4rem"
    },
    selected: {
      fontWeight: "bold"
    }
  })
);

export const useViewProfileStyles = makeStyles<Theme>(
  createStyles({
    title: {
      display: "flex",
      alignItems: "center"
    },
    avatar: {
      marginRight: "1rem"
    }
  })
);
