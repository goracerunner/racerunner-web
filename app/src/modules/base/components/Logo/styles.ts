import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import { LogoProps } from "./types";

export default makeStyles<Theme, LogoProps>(theme =>
  createStyles({
    img: ({ baseSize }) => ({
      transition: "all 0.4s",
      height: `${(baseSize || 45) * 0.8}px`,
      [theme.breakpoints.up("md")]: {
        height: `${baseSize || 45}px`
      }
    })
  })
);

export const useLinkStyles = makeStyles(
  createStyles({
    button: {
      color: "rgba(255, 255, 255, 0.7)"
    }
  })
);
