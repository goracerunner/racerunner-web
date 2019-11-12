import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(createStyles({}));

export const useMenuStyles = makeStyles<Theme>(
  createStyles({
    selected: {
      fontWeight: "bold"
    },
    cancel: {
      position: "absolute",
      right: "1rem",
      top: "1.4rem"
    },
    formControl: {
      width: "100%"
    }
  })
);
