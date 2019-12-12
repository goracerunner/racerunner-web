import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";

import ResponseList from "../ResponseList";

import { Node } from "../../../../types/node";

import { AllResponsesListProps } from "./types";
import useStyles from "./styles";

/**
 * This component collates a race's nodes to retrieve all responses.
 */
export const AllResponsesList: FC<AllResponsesListProps> = ({ race, type }) => {
  const classes = useStyles();
  const store = useFirestore();
  const [nodes, loading, error] = useCollectionData<Node>(
    store
      .collection("races")
      .doc(race.uid)
      .collection("nodes")
  );

  useErrorLogging(
    "AllResponsesList",
    `An error occurred when retrieving nodes from ${race.uid}.`,
    error
  );

  if (loading) return <Loading margin="10rem" />;

  if (nodes) {
    return (
      <Paper>
        <List className={classes.list}>
          {nodes.map(node => (
            <ResponseList
              key={node.nodeId}
              type={type}
              race={race}
              node={node}
            />
          ))}
        </List>
      </Paper>
    );
  }

  return null;
};
