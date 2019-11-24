import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { PropertyProps } from "./types";

export default makeStyles<Theme, PropertyProps>(
  createStyles({
    property: ({ noMargin }) => ({
      marginBottom: noMargin ? 0 : "1rem"
    })
  })
);
