import React, { FC, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import { useFirestore } from "../../../core/hooks/useFirebase";

import * as RichText from "../../../core/components/RichText";

import { EditNodeSecretsDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows a user to edit a node's secrets.
 */
export const EditNodeSecretsDialog: FC<EditNodeSecretsDialogProps> = ({
  open,
  onClose,
  raceId,
  node,
  secrets
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [isProtected, setIsProtected] = useState(false);
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // Clear error when the dialog is opened or if the user edits the field.

  useEffect(() => {
    if (open) setCodeError("");
  }, [open, code, isProtected, setCodeError]);

  // Reset the values when the dialog opens
  useEffect(() => {
    if (open) {
      setIsProtected(node.protected);
      setNotes(secrets.notes);
      setCode(secrets.code);
      setCodeError("");
    }
  }, [
    open,
    setIsProtected,
    setNotes,
    setCode,
    node.protected,
    secrets.notes,
    secrets.code
  ]);

  const onSave = async () => {
    if (isProtected && code.length < 3) {
      setCodeError("Code must be longer than 3 characters.");
      return;
    }

    onClose();

    const nodeRef = store
      .collection("races")
      .doc(raceId)
      .collection("nodes")
      .doc(node.nodeId);

    await nodeRef.update({ protected: isProtected });
    await nodeRef
      .collection("protected")
      .doc("secrets")
      .update({
        code,
        notes
      });

    enqueueSnackbar("Update node secrets.");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit node secrets</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" className={classes.field}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isProtected}
                onChange={e => setIsProtected(e.target.checked)}
                value="protected"
              />
            }
            label="Protected"
          />
          <FormHelperText className={classes.formHelperText}>
            Protected nodes can only be viewed if a team has unlocked it.
          </FormHelperText>
        </FormControl>
        {isProtected && (
          <TextField
            className={classes.field}
            label="Unlock code"
            fullWidth
            error={Boolean(codeError)}
            helperText={codeError}
            variant="outlined"
            onChange={e => setCode(e.target.value)}
            value={code}
          />
        )}

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel className={classes.label}>Notes</FormLabel>
          <FormHelperText className={classes.formHelperText}>
            These notes can only be seen by managers and will be displayed when
            checking responses.
          </FormHelperText>
        </FormControl>
        <RichText.Editor
          classes={{ root: classes.editor }}
          placeholder="Private notes"
          onChange={(text, html) => setNotes(html)}
          value={notes}
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
