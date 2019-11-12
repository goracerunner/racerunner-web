import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export default makeStyles<Theme>(
  createStyles({
    trueIcon: {
      color: green[700]
    },
    date: {
      width: "5rem"
    }
  })
);

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
