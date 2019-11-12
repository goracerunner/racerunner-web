import React, { FC, useContext } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { RemoveManagerDialogProps } from "./types";
import AuthenticationContext from "../../../core/contexts/AuthenticationContext";
// import useStyles from "./styles";

/**
 * This dialog confirms if a manager should be removed from a race.
 */
export const RemoveManagerDialog: FC<RemoveManagerDialogProps> = ({
  open,
  onClose,
  race,
  manager
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthenticationContext);

  const onRemoveHandler = async () => {
    onClose();

    // Don't take this action if the user is not available
    if (!user) return;

    if (user.uid === manager.uid) {
      // Don't allow a user to remove themselves
      enqueueSnackbar("You cannot remove yourself as a manager.", {
        variant: "error"
      });
    } else {
      // FIXME: Move these Firestore calls to a RaceModel class.
      const raceRef = store.collection("races").doc(race.uid);
      await raceRef
        .collection("managers")
        .doc(manager.uid)
        .delete();
      await raceRef
        .collection("participants")
        .doc(manager.uid)
        .set(manager);
      enqueueSnackbar(`Removed ${manager.name} from manager list.`, {
        variant: "success"
      });
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        Remove manager from <b>{race.name}</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <b>{manager.name}</b> from this race?
          They will become a participant in the race and will no longer be able
          to view the race management dashboard.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onRemoveHandler} color="primary" variant="contained">
          Remove manager
        </Button>
      </DialogActions>
    </Dialog>
  );
};
