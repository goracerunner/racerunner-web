import React, { FC, useEffect } from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router";
import { useSnackbar } from "notistack";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useBooleanState } from "../../../base/hooks/useStateFactory";

import Property from "../../../core/components/Property";
import Loading from "../../../core/components/Loading";
import RichTextEditor from "../../../core/components/RichTextEditor";

import { Node, NodeMeta, NodeSecrets } from "../../../../types/node";

import EditNodeMetaDialog from "../EditNodeMetaDialog";
import EditNodeSecretsDialog from "../EditNodeSecretsDialog";
import { NodeProfileProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a node's details and provides
 * controls to modify the node.
 */
export const NodeProfile: FC<NodeProfileProps> = ({ race, nodeId }) => {
  const classes = useStyles();

  const [showEditMeta, openEditMeta, closeEditMeta] = useBooleanState(false);
  const [showEditSecrets, openEditSecrets, closeEditSecrets] = useBooleanState(
    false
  );

  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const nodeRef = store
    .collection("races")
    .doc(race.uid)
    .collection("nodes")
    .doc(nodeId);

  const [node, nodeLoading, nodeError] = useDocument(nodeRef);
  const [meta, metaLoading, metaError] = useDocumentData<NodeMeta>(
    nodeRef.collection("protected").doc("meta")
  );
  const [secrets, secretsLoading, secretsError] = useDocumentData<NodeSecrets>(
    nodeRef.collection("protected").doc("secrets")
  );

  useErrorLogging(
    "NodeProfile",
    "Error occurred while retrieving node",
    nodeError
  );

  useErrorLogging(
    "NodeProfile",
    "Error occurred while retrieving node meta",
    metaError
  );

  useErrorLogging(
    "NodeProfile",
    "Error occurred while retrieving node secrets",
    secretsError
  );

  useEffect(() => {
    if (node && !node.exists) {
      enqueueSnackbar("Node not found.", { variant: "error" });
    }
  }, [node, enqueueSnackbar]);

  if (nodeLoading || metaLoading || secretsLoading) {
    return <Loading margin="8rem" />;
  }

  if (node) {
    if (!node.exists) {
      return <Redirect to="/manage/nodes" />;
    }

    const nodeData = node.data() as Node;
    return (
      <>
        <Paper className={classes.profile}>
          <IconButton className={classes.more} onClick={openEditMeta}>
            <EditIcon />
          </IconButton>
          {meta && (
            <>
              <Property title="Node name">{meta.name}</Property>
              <Property title="Description" />
              <RichTextEditor value={meta.description} readOnly />
              <EditNodeMetaDialog
                open={showEditMeta}
                onClose={closeEditMeta}
                raceId={race.uid}
                node={nodeData}
                meta={meta}
              />
            </>
          )}
        </Paper>
        <Paper className={classes.profile}>
          <IconButton className={classes.more} onClick={openEditSecrets}>
            <EditIcon />
          </IconButton>
          {secrets && (
            <>
              <Property title="Node visibility">
                {nodeData.protected ? "Protected" : "Public"}
              </Property>
              {nodeData.protected && (
                <Property title="Unlock code">{secrets.code}</Property>
              )}
              <Property title="Manager notes" />
              <RichTextEditor value={secrets.notes} readOnly />
              <EditNodeSecretsDialog
                open={showEditSecrets}
                onClose={closeEditSecrets}
                raceId={race.uid}
                node={nodeData}
                secrets={secrets}
              />
            </>
          )}
        </Paper>
      </>
    );
  }

  return null;
};
