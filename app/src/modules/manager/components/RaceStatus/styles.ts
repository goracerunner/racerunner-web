import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { RaceStatusStyleProps } from "./types";

export default makeStyles<Theme, RaceStatusStyleProps>(
  createStyles({
    label: ({ label }) => ({
      color: label
    }),
    root: ({ background }) => ({
      backgroundColor: background
    })
  })
);
