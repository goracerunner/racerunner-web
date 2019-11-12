import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    icon: {
      marginBottom: "0.5rem",
      height: "2rem",
      width: "2rem"
    },
    text: {
      overflowY: "visible"
    }
  })
);
