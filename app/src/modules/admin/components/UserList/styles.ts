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
    }
  })
);
