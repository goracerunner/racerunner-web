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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import { useFirestore } from "../../../core/hooks/useFirebase";

import RichTextEditor from "../../../core/components/RichTextEditor";

import { Node, NodeMeta, NodeSecrets } from "../../../../types/node";
import { Race } from "../../../../types/race";

import { CreateNodeDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows the user to create a new node.
 */
export const CreateNodeDialog: FC<CreateNodeDialogProps> = ({
  open,
  onClose,
  raceId
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [isProtected, setIsProtected] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [required, setRequired] = useState("");

  // Clear error when the dialog is opened or if the user edits the field.

  useEffect(() => {
    if (open) setNameError("");
  }, [open, name, setNameError]);

  useEffect(() => {
    if (open) setCodeError("");
  }, [open, code, setCodeError]);

  // Reset the values when the dialog opens
  useEffect(() => {
    if (open) {
      setIsProtected(true);
      setName("");
      setNameError("");
      setDescription("");
      setNotes("");
      setCode("");
      setCodeError("");
      setRequired("");
    }
  }, [
    open,
    setIsProtected,
    setName,
    setNameError,
    setDescription,
    setNotes,
    setCode,
    setRequired
  ]);

  const createNode = async () => {
    // Validation checks
    if (name.length < 3) {
      setNameError("Node name must be longer than 3 characters.");
      return;
    }

    if (isProtected && code.length < 3) {
      setCodeError("Code must be longer than 3 characters.");
      return;
    }

    onClose();

    // Get race ref
    const raceRef = store.collection("races").doc(raceId);
    const race = (await raceRef.get()).data() as Race;

    // Create node and sub documents
    const nodeRef = raceRef.collection("nodes").doc();
    const node: Node = {
      nodeId: nodeRef.id,
      order: race.nodeIds.length,
      protected: isProtected,
      unlockedTeams: [],
      unlockedUsers: []
    };
    const meta: NodeMeta = {
      nodeId: nodeRef.id,
      name: name.trim(),
      description,
      numberOfTasks: 0
    };
    const secrets: NodeSecrets = {
      nodeId: nodeRef.id,
      code: isProtected ? code.trim() : "",
      notes,
      prerequisites: {
        required: []
      }
    };

    await nodeRef.set(node);
    await nodeRef
      .collection("protected")
      .doc("meta")
      .set(meta);
    await nodeRef
      .collection("protected")
      .doc("secrets")
      .set(secrets);

    enqueueSnackbar(`Created node "${name}".`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a new node</DialogTitle>
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
        <RichTextEditor
          classes={{ root: classes.editor }}
          placeholder="Node description"
          onChange={(text, html) => setDescription(html)}
          value={description}
        />

        <FormControl component="fieldset" className={classes.field}>
          <FormLabel className={classes.label}>Notes</FormLabel>
          <FormHelperText className={classes.formHelperText}>
            These notes can only be seen by managers and will be displayed when
            checking responses.
          </FormHelperText>
        </FormControl>
        <RichTextEditor
          classes={{ root: classes.editor }}
          placeholder="Private notes"
          onChange={(text, html) => setNotes(html)}
          value={notes}
        />

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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={createNode}>
          Create node
        </Button>
      </DialogActions>
    </Dialog>
  );
};
