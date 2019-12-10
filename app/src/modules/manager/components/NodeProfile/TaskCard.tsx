import React, { FC } from "react";
import { useSnackbar } from "notistack";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import MoreIcon from "@material-ui/icons/MoreVert";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useMenuAnchor } from "../../../core/hooks/useMenu";

import * as RichText from "../../../core/components/RichText";
import Property from "../../../core/components/Property";
import ConfirmDialog from "../../../core/components/ConfirmDialog";

import { Task } from "../../../../types/node";

import { TaskCardProps } from "./types";
import EditTaskDialog from "../EditTaskDialog";

/**
 * This component shows information about a task.
 */
export const TaskCard: FC<TaskCardProps> = ({ node, raceId, task }) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [anchor, openMenu, closeMenu] = useMenuAnchor();
  const [showDelete, openDelete, closeDelete] = useBooleanState(false);
  const [showEdit, openEdit, closeEdit] = useBooleanState(false);

  const tasksRef = store
    .collection("races")
    .doc(raceId)
    .collection("nodes")
    .doc(node.nodeId)
    .collection("tasks");
  const taskRef = tasksRef.doc(task.taskId);

  const deleteTask = async () => {
    await taskRef.delete();
    enqueueSnackbar(`Task deleted from node.`);
  };

  const moveUp = async () => {
    const above = await tasksRef
      .where("order", "<", task.order)
      .orderBy("order", "desc")
      .get();
    if (!above.empty) {
      const previousTask = above.docs[0];
      await previousTask.ref.update({
        order: task.order
      });
      await taskRef.update({
        order: (previousTask.data() as Task).order
      });
    }
  };

  const moveDown = async () => {
    const below = await tasksRef
      .where("order", ">", task.order)
      .orderBy("order", "asc")
      .get();
    if (!below.empty) {
      const nextTask = below.docs[0];
      await nextTask.ref.update({
        order: task.order
      });
      await taskRef.update({
        order: (nextTask.data() as Task).order
      });
    }
  };

  return (
    <>
      <ListItem>
        <Property title={task.type}>
          <RichText.Preview value={task.description} />
        </Property>
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={openMenu}>
            <MoreIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            openEdit();
          }}
        >
          Edit
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
      <EditTaskDialog
        open={showEdit}
        onClose={closeEdit}
        raceId={raceId}
        task={task}
      />
      <ConfirmDialog
        title="Delete node"
        open={showDelete}
        onClose={closeDelete}
        fullWidth
        maxWidth="xs"
        confirmText="Delete"
        onConfirm={deleteTask}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
      </ConfirmDialog>
    </>
  );
};
