import React, { FC } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { RaceStatus } from "../../../../types/race";

import { RACE_STATUS_INFO } from "../RaceStatus";

import { RaceStatusDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This dialog allows the user to change the status of a race.
 */
export const RaceStatusDialog: FC<RaceStatusDialogProps> = ({
  open,
  onClose,
  raceId,
  status: currentStatus
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const setRaceStatus = (selectedStatus: RaceStatus) => async () => {
    onClose();
    await store
      .collection("races")
      .doc(raceId)
      .update({
        status: selectedStatus
      });
    enqueueSnackbar(
      `Race status set to "${selectedStatus.replace("_", " ")}"`,
      {
        variant: "success"
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>Change race status</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a status to set the race to.
        </DialogContentText>
      </DialogContent>
      <List>
        {RACE_STATUS_INFO.map(status => {
          const selected = status.id === currentStatus;
          return (
            <ListItem
              key={status.id}
              button
              selected={selected}
              disabled={selected}
              onClick={setRaceStatus(status.id)}
            >
              <ListItemText
                primary={status.label}
                secondary={status.description}
              ></ListItemText>
            </ListItem>
          );
        })}
      </List>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
