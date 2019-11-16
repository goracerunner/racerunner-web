import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import WarningIcon from "@material-ui/icons/Warning";
import RemoveIcon from "@material-ui/icons/Clear";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { UserProfile } from "../../../../types/users";
import { Nullable } from "../../../../types/global";

import { ParticipantListProps } from "./types";
// import useStyles from "./styles";

/**
 * This component shows the list of the current participants for the specified race.
 */
export const ParticipantList: FC<ParticipantListProps> = ({
  raceId,
  registrationIds,
  onSelectParticipant
}) => {
  const store = useFirestore();
  const [participants, loading, error] = useCollectionData<UserProfile>(
    store
      .collection("races")
      .doc(raceId)
      .collection("participants")
  );

  if (loading) {
    return <Loading margin="8rem" />;
  }

  if (error) {
    return (
      <Error
        error={error}
        caption="Failed to load participants."
        margin="8rem"
        iconSize="4rem"
      />
    );
  }

  if (participants) {
    return (
      <Paper>
        <List>
          {participants.map(participant => {
            let icon: Nullable<JSX.Element> = null;

            if (!registrationIds.includes(participant.uid)) {
              icon = (
                <Tooltip title="This user has not registered.">
                  <ListItemIcon>
                    <WarningIcon color="action" />
                  </ListItemIcon>
                </Tooltip>
              );
            }

            return (
              <ListItem key={participant.uid}>
                <ListItemAvatar>
                  <Avatar src={participant.photoURL} />
                </ListItemAvatar>
                <ListItemText primary={participant.name} />
                {icon}
                <ListItemSecondaryAction>
                  <Tooltip title="Remove this user from the race">
                    <IconButton
                      onClick={() => onSelectParticipant(participant)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }

  return null;
};
