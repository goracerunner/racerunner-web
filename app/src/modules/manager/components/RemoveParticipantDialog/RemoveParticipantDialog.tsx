import React, { FC, useContext } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useFirestore } from "../../../core/hooks/useFirebase";

import AuthenticationContext from "../../../core/contexts/AuthenticationContext";

import { RemoveParticipantDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This dialog confirms if a participant should be removed from a race.
 */
export const RemoveParticipantDialog: FC<RemoveParticipantDialogProps> = ({
  open,
  onClose,
  race,
  participant,
  registered
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthenticationContext);

  const onRemoveHandler = async () => {
    onClose();

    // Don't take this action if the user is not available
    if (!user) return;

    // FIXME: Move these Firestore calls to a RaceModel class.
    const raceRef = store.collection("races").doc(race.uid);
    await raceRef
      .collection("participants")
      .doc(participant.uid)
      .delete();
    if (registered) {
      await raceRef
        .collection("registrations")
        .doc(participant.uid)
        .delete();
    }
    enqueueSnackbar(`Removed ${participant.name} from the race.`, {
      variant: "success"
    });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        Remove manager from <b>{race.name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <b>{participant.name}</b> from this
          race?
          {registered && " Their registration will be removed."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onRemoveHandler} color="primary" variant="contained">
          Remove participant
        </Button>
      </DialogActions>
    </Dialog>
  );
};
