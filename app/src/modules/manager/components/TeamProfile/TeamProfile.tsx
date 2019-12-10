import React, { FC, useEffect, useState } from "react";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router";
import { useSnackbar } from "notistack";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";

import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  useBooleanState,
  useMapState
} from "../../../base/hooks/useStateFactory";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useMenuAnchor } from "../../../core/hooks/useMenu";
import { useErrorLogging } from "../../../base/hooks/useLogging";

import Loading from "../../../core/components/Loading";
import Property from "../../../core/components/Property";

import { Team } from "../../../../types/team";
import { UserProfile } from "../../../../types/users";
import { Nullable } from "../../../../types/global";

import { AddMemberDialog } from "./AddMemberDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import { DeleteTeamDialog } from "./DeleteTeamDialog";
import { TeamProfileProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a team's profile details and
 * provides controls to modify the team.
 */
export const TeamProfile: FC<TeamProfileProps> = ({ race, teamId }) => {
  const classes = useStyles();

  const [menuAnchor, openMenu, closeMenu] = useMenuAnchor();
  const [showAddMember, openAddMember, closeAddMember] = useBooleanState(false);
  const [showDelete, openDelete, closeDelete] = useBooleanState(false);
  const [
    showRemoveMember,
    openRemoveMember,
    closeRemoveMember
  ] = useBooleanState(false);
  const [memberToRemove, setMemberToRemove] = useState<Nullable<UserProfile>>(
    null
  );

  const [newMembers, setNewMember, setNewMembers] = useMapState<UserProfile>(
    {}
  );

  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const teamRef = store
    .collection("races")
    .doc(race.uid)
    .collection("teams")
    .doc(teamId);

  const [team, teamLoading, teamError] = useDocument(teamRef);

  const [members, membersLoading, membersError] = useCollectionData<
    UserProfile
  >(teamRef.collection("members"));

  useErrorLogging(
    "TeamProfile",
    "Error occurred while retrieving team",
    teamError
  );

  useErrorLogging(
    "TeamProfile",
    "Error occurred while retrieving team members",
    membersError
  );

  useEffect(() => {
    if (team && !team.exists) {
      enqueueSnackbar("Team not found.", { variant: "error" });
    }
  }, [team, enqueueSnackbar]);

  if (teamLoading || membersLoading) {
    return <Loading margin="8rem" />;
  }

  if (team) {
    if (!team.exists) {
      return <Redirect to="/manage/teams" />;
    }

    const teamData = team.data() as Team;
    const { name, points } = teamData;
    return (
      <>
        <Paper className={classes.profile}>
          <IconButton className={classes.more} onClick={openMenu}>
            <MoreIcon />
          </IconButton>
          <Property title="Team name">{name}</Property>
          <Property title="Points">{points.toString()}</Property>
          <Property title="Members">
            <List className={classes.members}>
              {members &&
                members.map(member => (
                  <ListItem key={member.uid}>
                    <ListItemAvatar>
                      <Avatar src={member.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={member.name} />
                    <ListItemSecondaryAction>
                      <Tooltip title={`Remove ${member.name}`}>
                        <IconButton
                          onClick={() => {
                            setMemberToRemove(member);
                            openRemoveMember();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              <ListItem dense button onClick={openAddMember}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText secondary="Add team member" />
              </ListItem>
            </List>
          </Property>
        </Paper>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          {/* // TODO: implement these features */}
          <MenuItem disabled>Edit team name</MenuItem>
          <MenuItem disabled>Edit team points</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              closeMenu();
              openDelete();
            }}
          >
            Delete team
          </MenuItem>
        </Menu>
        <AddMemberDialog
          open={showAddMember}
          onClose={closeAddMember}
          raceId={race.uid}
          team={teamData}
          members={newMembers}
          setMember={setNewMember}
          setNewMembers={setNewMembers}
        />
        <DeleteTeamDialog
          open={showDelete}
          onClose={closeDelete}
          raceId={race.uid}
          team={teamData}
        />
        {memberToRemove && (
          <RemoveMemberDialog
            open={showRemoveMember}
            onClose={closeRemoveMember}
            member={memberToRemove}
            raceId={race.uid}
            teamId={teamId}
          />
        )}
      </>
    );
  }

  return null;
};
