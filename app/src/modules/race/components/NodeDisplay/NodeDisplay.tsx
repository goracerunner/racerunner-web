import React, { FC } from "react";
import {
  useDocumentData,
  useCollectionData
} from "react-firebase-hooks/firestore";

import Divider from "@material-ui/core/Divider";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";
import * as RichText from "../../../core/components/RichText";

import { Node, NodeMeta, Task } from "../../../../types/node";

import PageTitle from "../PageTitle";
import NodeTask from "../NodeTask";

import { NodeDisplayProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders details about a node.
 */
export const NodeDisplay: FC<NodeDisplayProps> = ({ race, team, nodeId }) => {
  const classes = useStyles();
  const store = useFirestore();

  const nodeRef = store
    .collection("races")
    .doc(race.uid)
    .collection("nodes")
    .doc(nodeId);

  // Determine if the user is allowed to view this node
  const [node, nodeLoading, nodeError] = useDocumentData<Node>(nodeRef);
  const [meta, metaLoading, metaError] = useDocumentData<NodeMeta>(
    nodeRef.collection("protected").doc("meta")
  );
  const [tasks, tasksLoading, tasksError] = useCollectionData<Task>(
    nodeRef.collection("tasks").orderBy("order")
  );

  useErrorLogging(
    "NodeDisplay",
    `Error occurred when retrieving node ${nodeId}`,
    nodeError
  );

  useErrorLogging(
    "NodeDisplay",
    `Error occurred when retrieving meta for node ${nodeId}`,
    metaError
  );

  useErrorLogging(
    "NodeDisplay",
    `Error occurred when retrieving tasks for node ${nodeId}`,
    tasksError
  );

  if (nodeLoading || metaLoading || tasksLoading) {
    return <Loading margin="10rem" />;
  }

  if (
    node &&
    meta &&
    (!node.protected || node.unlockedTeams.includes(team.teamId))
  ) {
    return (
      <>
        <PageTitle title={meta.name} subtitle={race.name} />
        <Divider className={classes.divider} />
        <RichText.Preview value={meta.description} />
        <Divider className={classes.divider} />
        {tasks &&
          tasks.map(task => (
            <NodeTask
              key={task.taskId}
              race={race}
              team={team}
              node={node}
              task={task}
            />
          ))}
      </>
    );
  }

  return (
    <Error
      margin="10rem"
      error={
        nodeError
          ? nodeError.toString()
          : "Node does not exist or permission denied."
      }
      caption="Unable to display node."
    />
  );
};
