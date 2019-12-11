import React, { FC, useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFunction } from "../../../core/hooks/useFirebase";

import { pluralise } from "../../../../utils/text";
import { Logger } from "../../../../utils";

import { SubmitCodeDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows a user to submit a code to unlock a challenge.
 */
export const SubmitCodeDialog: FC<SubmitCodeDialogProps> = ({
  open,
  onClose: onCloseHandler,
  raceId,
  teamId
}) => {
  const classes = useStyles();
  const unlock = useFunction("unlock");
  const { enqueueSnackbar } = useSnackbar();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset code when dialog is opened.
  useEffect(() => {
    if (open) {
      setCode("");
      setLoading(false);
    }
  }, [open, setCode, setLoading]);

  const onClose = () => {
    if (!loading) onCloseHandler();
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await unlock({
        raceId,
        teamId,
        code
      });
      const { data: unlocked } = result;
      if (unlocked) {
        enqueueSnackbar(
          `Unlocked ${unlocked} new ${pluralise(
            "chanllenge",
            unlocked,
            "challenges"
          )}!`,
          { variant: "success" }
        );
      } else {
        enqueueSnackbar("Code rejected.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Code rejected.", { variant: "error" });
      Logger.error(
        "SubmitCodeDialog",
        "Error occurred when submitting code.",
        error
      );
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Submit code</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a code to unlock new challenges.
        </DialogContentText>
        <TextField
          fullWidth
          variant="outlined"
          value={code}
          onChange={e => setCode(e.target.value)}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading && (
            <CircularProgress className={classes.loading} size="20px" />
          )}
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
