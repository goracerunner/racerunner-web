import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { useErrorLogging } from "../../../base/hooks/useLogging";

import BackButton from "../../../base/components/BackButton";
import Loading from "../../../core/components/Loading";

import { Node } from "../../../../types/node";

import { NodeContainer } from "./NodeContainer";
import { NodesListProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a list of nodes for a team.
 */
export const NodesList: FC<NodesListProps> = ({ race, team, user, state }) => {
  const classes = useStyles();

  const store = useFirestore();
  const nodesRef = store
    .collection("races")
    .doc(race.uid)
    .collection("nodes");

  const [publicNodes, publicLoading, publicError] = useCollectionData<Node>(
    nodesRef.where("protected", "==", false).orderBy("order")
  );
  const [nodes, loading, error] = useCollectionData<Node>(
    nodesRef.where("unlockedUsers", "array-contains", user.uid).orderBy("order")
  );

  useErrorLogging(
    "NodesList",
    `Error occurred while retrieving public nodes for race ${race.uid}`,
    publicError
  );

  useErrorLogging(
    "NodesList",
    `Error occurred while retrieving nodes for race ${race.uid}`,
    error
  );

  if (publicLoading || loading) {
    return <Loading />;
  }

  if (nodes && publicNodes) {
    const allNodes = [...publicNodes, ...nodes];
    let content = (
      <Typography variant="body2" color="textSecondary">
        <b>
          No challenges currently available
          {state ? " in this category" : ""}.
        </b>
      </Typography>
    );

    if (allNodes.length > 0) {
      content = (
        <>
          {allNodes.map(node => (
            <NodeContainer
              key={node.nodeId}
              race={race}
              team={team}
              state={state}
              node={node}
            />
          ))}
        </>
      );
    }

    return (
      <div className={classes.root}>
        <BackButton className={classes.back} />
        {content}
      </div>
    );
  }

  return null;
};
