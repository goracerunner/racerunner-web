import React, { FC } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useFirestore } from "../../../core/hooks/useFirebase";

import { NodeMeta } from "../../../../types/node";

import { useCardStyles } from "./styles";
import { NodeCardProps } from "./types";

/**
 * This component renders the name of a node and displays it.
 * When clicked, it will redirect to the race node page.
 */
export const NodeCard: FC<NodeCardProps> = ({ race, node }) => {
  const classes = useCardStyles();
  const store = useFirestore();

  const [redirect, startRedirect] = useBooleanState(false);
  const [meta, loading, error] = useDocumentData<NodeMeta>(
    store
      .collection("races")
      .doc(race.uid)
      .collection("nodes")
      .doc(node.nodeId)
      .collection("protected")
      .doc("meta")
  );

  useErrorLogging(
    "NodeCard",
    `Error occurred when retrieving node metadata for node ${node.nodeId}`,
    error
  );

  if (redirect) {
    return <Redirect to={`/race/nodes/${node.nodeId}`} push />;
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={startRedirect}>
        <CardContent>
          <div className={classes.content}>
            <Typography variant="body1">{meta ? meta.name : "..."}</Typography>
            {loading && <CircularProgress size="1rem" />}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
