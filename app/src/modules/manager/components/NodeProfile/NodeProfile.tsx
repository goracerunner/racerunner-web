import React, { FC, useEffect } from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router";
import { useSnackbar } from "notistack";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useBooleanState } from "../../../base/hooks/useStateFactory";

import Property from "../../../core/components/Property";
import Loading from "../../../core/components/Loading";
import * as RichText from "../../../core/components/RichText";
import EditNodeMetaDialog from "../EditNodeMetaDialog";
import EditNodeSecretsDialog from "../EditNodeSecretsDialog";
import UnlockTeamDialog from "../UnlockTeamDialog";

import { Node, NodeMeta, NodeSecrets } from "../../../../types/node";

import { TeamPreview } from "./TeamPreview";
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
  const [showAddTeam, openAddTeam, closeAddTeam] = useBooleanState(false);

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
          <Tooltip title="Edit node metadata" placement="left">
            <IconButton className={classes.more} onClick={openEditMeta}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {meta && (
            <>
              <Property title="Node name">{meta.name}</Property>
              <Property title="Description" />
              <RichText.Preview value={meta.description} />
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
          <Tooltip title="Edit node secrets" placement="left">
            <IconButton className={classes.more} onClick={openEditSecrets}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {secrets && (
            <>
              <Property title="Node visibility">
                {nodeData.protected ? "Protected" : "Public"}
              </Property>
              {nodeData.protected && (
                <Property title="Unlock code">{secrets.code}</Property>
              )}
              <Property title="Manager notes" />
              <RichText.Preview value={secrets.notes} />
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
        <Paper className={classes.profile}>
          <Tooltip title="Unlock teams" placement="left">
            <IconButton className={classes.more} onClick={openAddTeam}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Property title="Unlocked teams" />
          {nodeData.unlockedTeams.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No teams have unlocked this node yet.
            </Typography>
          ) : (
            <List>
              {nodeData.unlockedTeams.map(id => (
                <TeamPreview
                  key={id}
                  raceId={race.uid}
                  teamId={id}
                  node={nodeData}
                />
              ))}
            </List>
          )}
          <UnlockTeamDialog
            open={showAddTeam}
            onClose={closeAddTeam}
            raceId={race.uid}
            node={nodeData}
          />
        </Paper>
      </>
    );
  }

  return null;
};
