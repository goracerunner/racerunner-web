import React, { FC, useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useFirestore } from "../../../core/hooks/useFirebase";

import * as RichText from "../../../core/components/RichText";

import { EditNodeMetaDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows a user to edit a node's metadata.
 */
export const EditNodeMetaDialog: FC<EditNodeMetaDialogProps> = ({
  open,
  onClose,
  raceId,
  node,
  meta
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(meta.name);
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState(meta.description);

  // Clear error when the dialog is opened or if the user edits the field.
  useEffect(() => {
    if (open) setNameError("");
  }, [open, name, setNameError]);

  // Reset the values when the dialog opens
  useEffect(() => {
    if (open) {
      setName(meta.name);
      setNameError("");
      setDescription(meta.description);
    }
  }, [
    open,
    setName,
    setNameError,
    setDescription,
    meta.name,
    meta.description
  ]);

  const onSave = async () => {
    // Validation checks
    if (name.length < 3) {
      setNameError("Node name must be longer than 3 characters.");
      return;
    }

    onClose();

    await store
      .collection("races")
      .doc(raceId)
      .collection("nodes")
      .doc(node.nodeId)
      .collection("protected")
      .doc("meta")
      .update({
        name,
        description
      });

    enqueueSnackbar(`Updated node metadata.`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit node metadata</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.field}
          label="Node name"
          fullWidth
          variant="outlined"
          error={Boolean(nameError)}
          helperText={nameError}
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel className={classes.label}>Description</FormLabel>
          <FormHelperText className={classes.formHelperText}>
            This description will be shown to race participants when they unlock
            this node.
          </FormHelperText>
        </FormControl>
        <RichText.Editor
          classes={{ root: classes.editor }}
          placeholder="Node description"
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
