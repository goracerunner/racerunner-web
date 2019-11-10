import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    loading: {
      display: "flex",
      justifyContent: "center",
      margin: "2rem 0"
    }
  })
);
