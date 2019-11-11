import React, { FC, useContext, useEffect } from "react";
import moment from "moment";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import HelpIcon from "@material-ui/icons/Help";

import DataContext from "../../contexts/DataContext";
import { DataContextState } from "../../contexts/DataContext/types";

import { Nullable } from "../../../../types/global";
import { Stat } from "../../../../types/stats";
import { Logger } from "../../../../utils";

import { StatDisplayProps } from "./types";
import useStyles from "./styles";

/**
 * This component retrieves Stat data from the closest `DataContext`
 * and displays it with a caption. Shows the appriate data state if
 * the data is loading, null or errored.
 */
export const StatDisplay: FC<StatDisplayProps> = ({
  caption,
  singularCaption,
  nullable
}) => {
  const classes = useStyles();
  const { contextExists, loading, error, data } = useContext<
    DataContextState<Stat<number>>
  >(DataContext);

  useEffect(() => {
    if (!contextExists) {
      Logger.error("StatDisplay", "No DataContext found.");
    }
  }, [contextExists]);

  useEffect(() => {
    if (error) {
      Logger.error("StatsDisplay", "Data error", error);
    }
  }, [error]);

  let content: Nullable<JSX.Element> = null;

  if (!contextExists) {
    // No context provided
    content = (
      <>
        <Tooltip title="Error: no data context provided.">
          <WarningIcon
            fontSize="large"
            color="disabled"
            className={classes.icon}
          />
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          Unavailable.
        </Typography>
      </>
    );
  } else if (loading) {
    // Show data loading
    content = (
      <CircularProgress
        className={classes.loading}
        color="secondary"
        size="2rem"
      />
    );
  } else if (error) {
    // Error occurred when retrieving data
    content = (
      <>
        <Tooltip title={error.toString()}>
          <ErrorIcon fontSize="large" color="error" className={classes.icon} />
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          Error retrieving data.
        </Typography>
      </>
    );
  } else if (!data) {
    if (!nullable) {
      // Data was null when it should not be allowed to be null
      content = (
        <>
          <WarningIcon
            fontSize="large"
            color="disabled"
            className={classes.icon}
          />
          <Typography variant="body2" color="textSecondary">
            Data does not exist.
          </Typography>
        </>
      );
    } else {
      // Data is null
      content = (
        <>
          <HelpIcon
            fontSize="large"
            color="disabled"
            className={classes.icon}
          />
          <Typography variant="body2" color="textSecondary">
            Data unavailable.
          </Typography>
        </>
      );
    }
  } else {
    // Display the data.
    content = (
      <>
        <Tooltip
          title={
            data!.modified
              ? `Last updated ${moment(data!.modified.toDate()).fromNow()}`
              : `No update history available.`
          }
        >
          <Typography
            variant="h4"
            className={clsx(classes.title, classes.icon)}
          >
            <b>{data!.value}</b>
          </Typography>
        </Tooltip>
        {caption && (
          <Typography variant="body2">
            {data!.value === 1
              ? singularCaption
                ? singularCaption
                : caption
              : caption}
          </Typography>
        )}
      </>
    );
  }

  return <div className={classes.root}>{content}</div>;
};
