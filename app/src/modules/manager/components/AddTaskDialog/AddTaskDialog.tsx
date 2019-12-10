import React, { FC, useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { useFirestore } from "../../../core/hooks/useFirebase";

import * as RichText from "../../../core/components/RichText";

import { TaskType, Task, NodeMeta } from "../../../../types/node";

import { AddTaskDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows a user to create a task in a node.
 */
export const AddTaskDialog: FC<AddTaskDialogProps> = ({
  open,
  onClose,
  raceId,
  node
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [type, setType] = useState<TaskType>("phrase");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setType("phrase");
      setDescription("");
    }
  }, [open, setType, setDescription]);

  const createTask = async () => {
    onClose();

    const raceRef = store.collection("races").doc(raceId);
    const nodeRef = raceRef.collection("nodes").doc(node.nodeId);
    const metaRef = nodeRef.collection("protected").doc("meta");
    const taskRef = nodeRef.collection("tasks").doc();

    const meta = (await metaRef.get()).data() as NodeMeta;

    const task: Task = {
      taskId: taskRef.id,
      description,
      type,
      nodeId: node.nodeId,
      order: meta.numberOfTasks
    };

    await taskRef.set(task);

    enqueueSnackbar(`Created task in node.`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a task</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Task type</InputLabel>
          <Select
            fullWidth
            value={type}
            onChange={e => setType(e.target.value as TaskType)}
          >
            <MenuItem value="phrase">Phrase</MenuItem>
            <MenuItem value="photo">Photo</MenuItem>
            <MenuItem value="manual">Manual</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel className={classes.label}>Task description</FormLabel>
          <FormHelperText className={classes.formHelperText}>
            This description will be shown to race participants when they view
            this task.
          </FormHelperText>
        </FormControl>
        <RichText.Editor
          classes={{ root: classes.editor }}
          placeholder="Task description"
          onChange={(text, html) => setDescription(html)}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={createTask}>
          Create task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
