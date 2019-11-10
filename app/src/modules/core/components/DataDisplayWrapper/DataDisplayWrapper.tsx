import React, { FC, useContext } from "react";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import DataContext from "../../contexts/DataContext";
import { DataContextState } from "../../contexts/DataContext/types";

import Property from "../Property";

import { DataDisplayWrapperProps } from "./types";
import useStyles from "./styles";

/**
 * This component shows the loading and error states
 * for a `DataProvider` context. If the `DataProvider`'s
 * data has loaded without errors, it will render its
 * children.
 */
export const DataDisplayWrapper: FC<DataDisplayWrapperProps> = ({
  children
}) => {
  const classes = useStyles();

  const { contextExists, data, loading, error } = useContext<DataContextState>(
    DataContext
  );

  if (!contextExists) {
    return (
      <Property title="Failed to display details.">
        <Typography variant="body2" color="error">
          Data context not found.
        </Typography>
      </Property>
    );
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress size="1rem" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Property title="An error occurred when retrieving data.">
        <Typography variant="body2" color="error">
          {error ? error.toString() : "User data not found."}
        </Typography>
      </Property>
    );
  }

  return <>{children}</>;
};
