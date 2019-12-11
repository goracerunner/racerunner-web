import React, { FC, useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import WaitIcon from "@material-ui/icons/HourglassFull";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import * as RichText from "../../../core/components/RichText";
import Loading from "../../../core/components/Loading";

import { Nullable } from "../../../../types/global";
import { ResponseCheck, Response } from "../../../../types/node";

import { SubmissionField } from "./SubmissionField";

import { NodeTaskProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders the details about a task in a node.
 */
export const NodeTask: FC<NodeTaskProps> = ({ race, team, node, task }) => {
  const classes = useStyles();
  const store = useFirestore();

  const nodeRef = store
    .collection("races")
    .doc(race.uid)
    .collection("nodes")
    .doc(node.nodeId);

  const [responses, responsesLoading, responsesError] = useCollectionData<
    Response
  >(
    nodeRef
      .collection("responses")
      .where("teamId", "==", team.teamId)
      .where("taskId", "==", task.taskId)
      .orderBy("date", "desc")
  );

  const [checks, checksLoading, checksError] = useCollectionData<ResponseCheck>(
    nodeRef
      .collection("checks")
      .where("teamId", "==", team.teamId)
      .where("taskId", "==", task.taskId)
  );

  useErrorLogging(
    "NodeTask",
    `Error occurred while getting responses for task ${task.taskId}`,
    responsesError
  );

  useErrorLogging(
    "NodeTask",
    `Error occurred while getting checks for task ${task.taskId}`,
    checksError
  );

  const [latestResponse, setResponse] = useState<Nullable<Response>>(null);
  const [latestCheck, setCheck] = useState<Nullable<ResponseCheck>>(null);

  // Save the latest response
  useEffect(() => {
    if (
      responses &&
      responses.length &&
      (!latestResponse || latestResponse.responseId !== responses[0].responseId)
    ) {
      setResponse(responses[0]);
    }
  }, [responses, latestResponse, setResponse]);

  // Save the latest check
  useEffect(() => {
    if (
      checks &&
      checks.length &&
      (!latestCheck || latestCheck.responseId !== checks[0].responseId)
    ) {
      setCheck(checks[0]);
    }
  }, [checks, latestCheck, setCheck]);

  let content: Nullable<JSX.Element> = null;

  if (responsesLoading || checksLoading) {
    content = <Loading size="1rem" />;
  } else if (!latestResponse) {
    // No submissions yet
    content = <SubmissionField race={race} task={task} team={team} />;
  } else if (
    !latestCheck ||
    latestResponse.responseId !== latestCheck.responseId
  ) {
    // One submission pending OR
    // More than one submission, latest one is pending
    content = (
      <ListItem>
        <ListItemIcon>
          <WaitIcon />
        </ListItemIcon>
        <ListItemText secondary="Pending result." />
      </ListItem>
    );
  } else if (latestCheck.retry) {
    // Multiple submissions allowed
    content = <SubmissionField race={race} task={task} team={team} />;
  } else {
    // Submission is finalised.
    content = <>Checked for {latestCheck.points} points </>;
  }

  return (
    <Paper className={classes.paper}>
      <RichText.Preview value={task.description} />
      {content}
    </Paper>
  );
};
