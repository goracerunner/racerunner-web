import React, { FC, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSnackbar } from "notistack";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import MoreIcon from "@material-ui/icons/MoreVert";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useMenuAnchor } from "../../../core/hooks/useMenu";

import Loading from "../../../core/components/Loading";
import ConfirmDialog from "../../../core/components/ConfirmDialog";

import { Logger } from "../../../../utils";
import { pluralise } from "../../../../utils/text";

import { Nullable } from "../../../../types/global";
import { NodeMeta, Node } from "../../../../types/node";

import { NodePreviewProps } from "./types";

/**
 * This component renders a preview of a node and its meta
 * information for managers.
 */
export const NodePreview: FC<NodePreviewProps> = ({ raceId, node }) => {
  const store = useFirestore();

  const { enqueueSnackbar } = useSnackbar();
  const [anchor, openMenu, closeMenu] = useMenuAnchor();
  const [showDelete, openDelete, closeDelete] = useBooleanState(false);

  const nodesRef = store
    .collection("races")
    .doc(raceId)
    .collection("nodes");
  const nodeRef = nodesRef.doc(node.nodeId);

  const [meta, metaLoading, metaError] = useDocumentData<NodeMeta>(
    nodeRef.collection("protected").doc("meta")
  );

  useEffect(() => {
    if (metaError) {
      Logger.error(
        "NodePreview",
        `Failed to load metadata for node ${node.nodeId}`,
        metaError
      );
    }
  }, [metaError, node.nodeId]);

  const deleteNode = useCallback(() => {
    const runDelete = async () => {
      await nodeRef.delete();
      enqueueSnackbar(`Node "${meta ? meta.name : node.nodeId}" was deleted.`);
    };
    runDelete();
  }, [nodeRef, meta, node.nodeId, enqueueSnackbar]);

  const moveUp = async () => {
    const above = await nodesRef
      .where("order", "<", node.order)
      .orderBy("order", "desc")
      .get();
    if (!above.empty) {
      const previousNode = above.docs[0];
      await previousNode.ref.update({
        order: node.order
      });
      await nodeRef.update({
        order: (previousNode.data() as Node).order
      });
    }
  };

  const moveDown = async () => {
    const below = await nodesRef
      .where("order", ">", node.order)
      .orderBy("order", "asc")
      .get();
    if (!below.empty) {
      const nextNode = below.docs[0];
      await nextNode.ref.update({
        order: node.order
      });
      await nodeRef.update({
        order: (nextNode.data() as Node).order
      });
    }
  };

  let content: Nullable<JSX.Element> = (
    <ListItemText primary={node.nodeId} secondary="? tasks" />
  );

  if (metaLoading) {
    content = (
      <>
        <ListItemText primary={node.nodeId} secondary="? tasks" />
        <ListItemSecondaryAction>
          <Loading size="1.2rem" />
        </ListItemSecondaryAction>
      </>
    );
  } else if (meta) {
    content = (
      <>
        <ListItemText
          primary={meta.name}
          secondary={`${meta.numberOfTasks} ${pluralise(
            "task",
            meta.numberOfTasks
          )}`}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={openMenu}>
            <MoreIcon />
          </IconButton>
        </ListItemSecondaryAction>
        <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu}>
          <MenuItem component={Link} to={`/manage/nodes/${node.nodeId}`}>
            Open node
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              closeMenu();
              moveUp();
            }}
          >
            Move up
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              moveDown();
            }}
          >
            Move down
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              closeMenu();
              openDelete();
            }}
          >
            Delete node
          </MenuItem>
        </Menu>
        <ConfirmDialog
          title="Delete node"
          open={showDelete}
          onClose={closeDelete}
          fullWidth
          maxWidth="xs"
          confirmText="Delete"
          onConfirm={deleteNode}
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this node? All response
              information will also be deleted.
            </DialogContentText>
          </DialogContent>
        </ConfirmDialog>
      </>
    );
  }

  return <ListItem>{content}</ListItem>;
};
