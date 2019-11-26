import React, { FC } from "react";
import { useSnackbar } from "notistack";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { useFirestore } from "../../../core/hooks/useFirebase";

import ConfirmDialog from "../../../core/components/ConfirmDialog";

import { RemoveMemberDialogProps } from "./types";

/**
 * This component renders a confirmation dialog for removing a team member.
 */
export const RemoveMemberDialog: FC<RemoveMemberDialogProps> = ({
  open,
  onClose,
  member,
  raceId,
  teamId
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Remove team member"
      confirmText="Remove"
      onConfirm={async () => {
        onClose();
        await store
          .collection("races")
          .doc(raceId)
          .collection("teams")
          .doc(teamId)
          .collection("members")
          .doc(member.uid)
          .delete();
        enqueueSnackbar(`Removed "${member.name}".`, {
          variant: "success"
        });
      }}
    >
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove {member.name} from this team?
        </DialogContentText>
      </DialogContent>
    </ConfirmDialog>
  );
};
