import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      marginTop: "3rem",
      marginBottom: "2rem"
    }
  })
);