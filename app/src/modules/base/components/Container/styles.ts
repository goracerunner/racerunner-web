import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { ContainerProps } from "./types";

export default makeStyles<Theme, ContainerProps>(theme =>
  createStyles({
    root: ({ fullWidth, margins }) => ({
      padding: "0 1rem",
      margin: "0.5rem auto",
      maxWidth: "auto",
      [theme.breakpoints.up("md")]: {
        maxWidth: fullWidth ? `calc(100% - ${margins || "1rem"})` : "57rem"
      }
    })
  })
);
