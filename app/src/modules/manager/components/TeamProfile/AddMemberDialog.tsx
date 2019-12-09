import React, { FC, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { pluralise } from "../../../../utils/text";

import SelectNewTeamMembers from "../SelectNewTeamMembers";

import { AddMemberDialogProps } from "./types";

/**
 * This component shows a list of participants that can be added to a team.
 */
export const AddMemberDialog: FC<AddMemberDialogProps> = ({
  open,
  onClose,
  raceId,
  team,
  members,
  setMember,
  setNewMembers
}) => {
  useEffect(() => {
    if (open) setNewMembers({});
  }, [open, setNewMembers]);

  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const addMembers = async () => {
    onClose();

    const membersToAdd = Object.keys(members)
      .filter(key => members[key])
      .map(key => members[key]);

    // Add members to the members collection
    await Promise.all(
      membersToAdd.map(
        async member =>
          await store
            .collection("races")
            .doc(raceId)
            .collection("teams")
            .doc(team.teamId)
            .collection("members")
            .doc(member.uid)
            .set(member)
      )
    );

    enqueueSnackbar(
      `Added ${membersToAdd.length} ${pluralise(
        "member",
        membersToAdd.length
      )}.`,
      { variant: "success" }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add team members</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select participants to add to this team.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <SelectNewTeamMembers
          raceId={raceId}
          members={members}
          setMember={setMember}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={addMembers}
          variant="contained"
          color="primary"
          disabled={
            Object.keys(members).reduce(
              (count, key) => count + (members[key] ? 1 : 0),
              0
            ) === 0
          }
        >
          Add members
        </Button>
      </DialogActions>
    </Dialog>
  );
};
