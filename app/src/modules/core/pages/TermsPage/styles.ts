import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    title: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem"
    },
    heading: {
      margin: "0.5rem 0"
    },
    paragraph: {
      marginBottom: "1rem"
    },
    section: {
      margin: "1rem 0"
    }
  })
);
