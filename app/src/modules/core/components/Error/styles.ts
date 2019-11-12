import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { ErrorProps } from "./types";

export default makeStyles<Theme, ErrorProps>(
  createStyles({
    centered: ({ margin = "2rem" }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: margin,
      marginBottom: margin
    }),
    icon: ({ iconSize = "2.5rem", iconSpacing = "0.5rem" }) => ({
      marginBottom: iconSpacing,
      height: iconSize,
      width: iconSize
    })
  })
);
