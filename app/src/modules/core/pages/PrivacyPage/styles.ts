import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    title: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem"
    }
  })
);
