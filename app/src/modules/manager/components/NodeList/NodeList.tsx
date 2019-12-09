import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AddIcon from "@material-ui/icons/Add";

import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";

import { Node } from "../../../../types/node";

import { NodePreview } from "./NodePreview";
import { NodeListProps } from "./types";
import useStyles from "./styles";

/**
 * This component shows the list of nodes for the selected race.
 */
export const NodeList: FC<NodeListProps> = ({ raceId, onAddNode }) => {
  const classes = useStyles();

  const store = useFirestore();
  const [nodes, loading, error] = useCollectionData<Node>(
    store
      .collection("races")
      .doc(raceId)
      .collection("nodes")
      .orderBy("order")
  );

  if (loading) {
    return <Loading margin="8rem" />;
  }

  if (error) {
    return (
      <Error
        error={error}
        caption="Failed to load nodes."
        margin="8rem"
        iconSize="4rem"
      />
    );
  }

  if (nodes) {
    return (
      <Paper>
        <List className={classes.list}>
          {nodes.length === 0 && (
            <Typography color="textSecondary" className={classes.empty}>
              No nodes yet
            </Typography>
          )}
          {nodes.length > 0 &&
            nodes.map(node => (
              <NodePreview key={node.nodeId} raceId={raceId} node={node} />
            ))}
        </List>
        <Divider />
        <ListItem button onClick={onAddNode}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" color="textSecondary">
              Add a new node
            </Typography>
          </ListItemText>
        </ListItem>
      </Paper>
    );
  }

  return null;
};
