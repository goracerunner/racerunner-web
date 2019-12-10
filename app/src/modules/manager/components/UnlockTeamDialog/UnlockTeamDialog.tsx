import React, { FC } from "react";
import { firestore } from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";

import { Team } from "../../../../types/team";

import { UnlockTeamDialogProps } from "./types";
import { pluralise } from "../../../../utils/text";
// import useStyles from "./styles";

/**
 * This dialog shows a list of teams that can be
 * unlocked for a node.
 */
export const UnlockTeamDialog: FC<UnlockTeamDialogProps> = ({
  open,
  onClose,
  raceId,
  node
}) => {
  // const classes = useStyles();
  const store = useFirestore();

  const [teams, teamsLoading, teamsError] = useCollectionData<Team>(
    store
      .collection("races")
      .doc(raceId)
      .collection("teams")
  );

  useErrorLogging(
    "UnlockTeamDialog",
    "An error occurred when retrieving teams.",
    teamsError
  );

  const unlockTeam = async (teamId: string) => {
    store
      .collection("races")
      .doc(raceId)
      .collection("nodes")
      .doc(node.nodeId)
      .update({
        unlockedTeams: firestore.FieldValue.arrayUnion(teamId)
      });
  };

  const unlockableTeams = teams
    ? teams.filter(team => !node.unlockedTeams.includes(team.teamId))
    : [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Unlock teams</DialogTitle>
      <DialogContent>
        {teamsLoading ? (
          <Loading />
        ) : (
          <>
            <DialogContentText>
              Click on a team to unlock the node for that team.
            </DialogContentText>
            <List>
              {unlockableTeams.length === 0 && (
                <ListItem>
                  <ListItemText secondary="No teams can be unlocked at this time." />
                </ListItem>
              )}
              {unlockableTeams.map(team => (
                <ListItem
                  key={team.teamId}
                  button
                  onClick={() => unlockTeam(team.teamId)}
                >
                  <ListItemText
                    primary={team.name}
                    secondary={`${team.points} ${pluralise(
                      "point",
                      team.points
                    )}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
