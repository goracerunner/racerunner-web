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
    claims: {
      margin: 0
    }
  })
);
