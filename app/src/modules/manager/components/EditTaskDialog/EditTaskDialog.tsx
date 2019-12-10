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

import { EditTaskDialogProps } from "./types";
import useStyles from "./styles";
import { TaskType } from "../../../../types/node";

/**
 * This dialog allows a user to edit a task's details.
 */
export const EditTaskDialog: FC<EditTaskDialogProps> = ({
  open,
  onClose,
  raceId,
  task
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [type, setType] = useState(task.type);
  const [description, setDescription] = useState(task.description);

  // Reset the values when the dialog opens
  useEffect(() => {
    if (open) {
      setType(task.type);
      setDescription(task.description);
    }
  }, [open, setType, setDescription, task.type, task.description]);

  const onSave = async () => {
    onClose();

    const raceRef = store.collection("races").doc(raceId);
    const nodeRef = raceRef.collection("nodes").doc(task.nodeId);
    const taskRef = nodeRef.collection("tasks").doc(task.taskId);

    await taskRef.update({
      type,
      description
    });

    enqueueSnackbar(`Updated task.`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit task</DialogTitle>
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
        <Button color="primary" variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
