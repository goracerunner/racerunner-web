import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { LoadingProps } from "./types";

export default makeStyles<Theme, LoadingProps>(
  createStyles({
    centered: ({ margin = "2rem" }) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin
    })
  })
);
