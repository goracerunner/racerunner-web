import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";

import { UserProfile } from "../../../../types/users";

import { TeamMemberListProps } from "./types";
// import useStyles from "./styles";

/**
 * This component renders a list of team members.
 */
export const TeamMemberList: FC<TeamMemberListProps> = ({
  race,
  team,
  user
}) => {
  const store = useFirestore();
  const [members, loading, error] = useCollectionData<UserProfile>(
    store
      .collection("races")
      .doc(race.uid)
      .collection("teams")
      .doc(team.teamId)
      .collection("members")
  );

  useErrorLogging(
    "TeamMemberList",
    `Error occurred when retrieving team members for user ${user.uid}`,
    error
  );

  if (loading) {
    return <Loading />;
  }

  const membersToShow = members ? members.filter(m => m.uid !== user.uid) : [];

  return (
    <List>
      {membersToShow.length === 0 ? (
        <ListItem>
          <ListItemText secondary="No team members" />
        </ListItem>
      ) : (
        membersToShow.map(member => (
          <ListItem key={member.uid}>
            <ListItemAvatar>
              <Avatar src={member.photoURL} />
            </ListItemAvatar>
            <ListItemText primary={member.name} />
          </ListItem>
        ))
      )}
    </List>
  );
};
