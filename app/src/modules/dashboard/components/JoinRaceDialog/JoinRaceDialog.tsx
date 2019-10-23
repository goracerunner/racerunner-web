import React, { FC, useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFunction } from "../../../core/hooks/useFirebase";

import { Race } from "../../../../types/race";
import { JoinRaceDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows a user to join a race if they enter a valid code.
 */
export const JoinRaceDialog: FC<JoinRaceDialogProps> = ({ open, onClose }) => {
  const classes = useStyles();

  const joinRace = useFunction("joinRace");
  const { enqueueSnackbar } = useSnackbar();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("User already in race");

  // Reset the field when the dialog is open
  useEffect(() => {
    if (open) setCode("");
  }, [open, setCode]);

  const onCloseHandler = () => {
    if (!loading) onClose();
  };

  const onJoin = () => {
    if (!code) {
      setError(`Code is required.`);
      return;
    }

    async function requestJoinRace() {
      setLoading(true);
      try {
        const race = (await joinRace({ raceId: code })).data as Race;
        setLoading(false);
        enqueueSnackbar(`Joined "${race.name}"!`, {
          variant: "success"
        });

        // Close the dialog
        onCloseHandler();
      } catch (error) {
        setLoading(false);
        setError(error.toString().replace("Error: ", ""));
      }
    }
    requestJoinRace();
  };

  useEffect(() => {
    if (open) {
      setError("");
    }
  }, [open, code, setError]);

  return (
    <Dialog open={open} onClose={onCloseHandler} fullWidth maxWidth="xs">
      <DialogTitle>Join a race</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the race code.</DialogContentText>
        <TextField
          value={code}
          onChange={e => setCode(e.target.value)}
          disabled={loading}
          fullWidth
          error={Boolean(error)}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} disabled={loading}>
          Close
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onJoin}
          disabled={loading}
        >
          {loading && (
            <CircularProgress className={classes.loading} size={20} />
          )}
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
