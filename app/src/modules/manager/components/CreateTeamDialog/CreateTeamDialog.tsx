import React, { FC, useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { pluralise } from "../../../../utils/text";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useMapState } from "../../../base/hooks/useStateFactory";

import SelectNewTeamMembers from "../SelectNewTeamMembers";

import { UserProfile, RaceParticipantProfile } from "../../../../types/users";
import { TeamInput } from "../../../../types/team";

import { CreateTeamDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This component renders a dialog for creating a new team.
 */
export const CreateTeamDialog: FC<CreateTeamDialogProps> = ({
  open,
  onClose,
  raceId
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [members, setMember, setMembers] = useMapState<UserProfile>({});

  // Clear error when the dialog closes or if the user edits the name field.
  useEffect(() => {
    if (open) setError("");
  }, [open, name, setError]);

  // Reset the values when the dialog opens
  useEffect(() => {
    if (open) {
      setName("");
      setMembers({});
    }
  }, [open, setError, setName, setMembers]);

  // Function to create a team
  const createTeam = async () => {
    // Validation
    if (name.length < 3) {
      setError("Team name must be longer than 3 characters.");
      return;
    }

    onClose();

    const raceRef = store.collection("races").doc(raceId);
    const teamRef = raceRef.collection("teams").doc();

    // Create team
    const team: TeamInput = {
      teamId: teamRef.id,
      name: name.trim(),
      created: new Date(),
      memberIds: [],
      points: 0
    };

    await teamRef.set(team);

    // Add members to the members collection
    const membersToAdd = Object.keys(members)
      .filter(key => members[key])
      .map(key => members[key] as RaceParticipantProfile);

    await Promise.all(
      membersToAdd.map(
        async member =>
          await teamRef
            .collection("members")
            .doc(member.uid)
            .set(member)
      )
    );

    if (membersToAdd.length) {
      enqueueSnackbar(
        `Created team ${name} with ${membersToAdd.length} ${pluralise(
          "member",
          membersToAdd.length
        )}`,
        { variant: "success" }
      );
    } else {
      enqueueSnackbar(`Created team ${name}`, { variant: "success" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a new team</DialogTitle>
      <DialogContent>
        <TextField
          label="Team name"
          fullWidth
          variant="outlined"
          error={Boolean(error)}
          helperText={error}
          onChange={e => setName(e.target.value)}
          value={name}
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          Select members to add to this team. You can also do this later.
        </DialogContentText>
        <SelectNewTeamMembers
          raceId={raceId}
          members={members}
          setMember={setMember}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={createTeam}>
          Create team
        </Button>
      </DialogActions>
    </Dialog>
  );
};
