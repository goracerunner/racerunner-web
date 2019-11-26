import React, { FC } from "react";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { useFirestore } from "../../../core/hooks/useFirebase";

import ConfirmDialog from "../../../core/components/ConfirmDialog";

import { DeleteTeamDialogProps } from "./types";

/**
 * This component renders a confirmation dialog for deleting a team.
 */
export const DeleteTeamDialog: FC<DeleteTeamDialogProps> = ({
  open,
  onClose,
  raceId,
  team
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const store = useFirestore();
  const { push } = useHistory();

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Delete team"
      confirmText="Delete"
      onConfirm={async () => {
        onClose();
        push("/manage/teams");
        await store
          .collection("races")
          .doc(raceId)
          .collection("teams")
          .doc(team.uid)
          .delete();
        enqueueSnackbar(`Delete the team "${team.name}".`, {
          variant: "success"
        });
      }}
    >
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this team?
        </DialogContentText>
      </DialogContent>
    </ConfirmDialog>
  );
};
