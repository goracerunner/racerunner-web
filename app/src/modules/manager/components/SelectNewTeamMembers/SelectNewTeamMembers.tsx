import React, { FC, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { RaceParticipantProfile } from "../../../../types/users";

import { SelectNewTeamMembersProps } from "./types";
import useStyles from "./styles";

/**
 * This component provides an interface to select race participants
 * which are not currently in a team.
 */
export const SelectNewTeamMembers: FC<SelectNewTeamMembersProps> = ({
  raceId,
  members,
  setMember
}) => {
  const classes = useStyles();

  const store = useFirestore();
  const [participants, loading] = useCollectionData<RaceParticipantProfile>(
    store
      .collection("races")
      .doc(raceId)
      .collection("participants")
  );

  const [filter, setFilter] = useState("");

  return (
    <>
      <TextField
        placeholder="Filter users..."
        fullWidth
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <List dense className={classes.list}>
        {!loading && participants && participants.length ? (
          participants
            .filter(participant => !participant.teamId)
            .filter(
              participant =>
                !filter ||
                participant.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(participant => (
              <ListItem
                key={participant.uid}
                onClick={() => {
                  if (members[participant.uid]) {
                    setMember(participant.uid, null);
                  } else {
                    setMember(participant.uid, participant);
                  }
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={Boolean(members[participant.uid])}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemIcon className={classes.avatarIcon}>
                  <Avatar
                    src={participant.photoURL}
                    className={classes.avatar}
                  />
                </ListItemIcon>
                <ListItemText primary={participant.name} />
              </ListItem>
            ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No participants available.
          </Typography>
        )}
      </List>
    </>
  );
};
