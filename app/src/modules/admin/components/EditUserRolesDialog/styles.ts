import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
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

export const useDisplayStyles = makeStyles<Theme>(
  createStyles({
    loading: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      margin: "1rem"
    },
    helperText: {
      marginTop: 0
    },
    switch: {
      marginBottom: "0.5rem"
    }
  })
);
