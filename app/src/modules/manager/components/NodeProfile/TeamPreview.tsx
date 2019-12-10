import React, { FC } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "firebase/app";
import { useSnackbar } from "notistack";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DeleteIcon from "@material-ui/icons/Clear";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { pluralise } from "../../../../utils/text";

import Loading from "../../../core/components/Loading";
import ConfirmDialog from "../../../core/components/ConfirmDialog";

import { Team } from "../../../../types/team";

import { TeamPreviewProps } from "./types";

/**
 * This component gets a team's details and displays it as a list item.
 */
export const TeamPreview: FC<TeamPreviewProps> = ({ raceId, teamId, node }) => {
  const [showDialog, openDialog, closeDialog] = useBooleanState(false);

  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [team, teamLoading, teamError] = useDocumentData<Team>(
    store
      .collection("races")
      .doc(raceId)
      .collection("teams")
      .doc(teamId)
  );

  useErrorLogging(
    "TeamPreview",
    "Error occurred while getting the team",
    teamError
  );

  const onRemove = async () => {
    if (team) {
      await store
        .collection("races")
        .doc(raceId)
        .collection("nodes")
        .doc(node.nodeId)
        .update({
          unlockedTeams: firestore.FieldValue.arrayRemove(teamId)
        });
      enqueueSnackbar(`Removed access for team "${team.name}".`);
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={team ? team.name : teamId}
        secondary={
          team
            ? `${team.points} ${pluralise("point", team.points)}`
            : "Loading..."
        }
      />
      <ListItemSecondaryAction>
        {teamLoading ? (
          <Loading size="1.2rem" />
        ) : (
          <Tooltip title="Remove team access" placement="left">
            <IconButton onClick={openDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        <ConfirmDialog
          open={showDialog}
          onClose={closeDialog}
          title="Remove team access"
          confirmText="Remove"
          onConfirm={onRemove}
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this team's access? They will no
              longer be able to view this node nor their responses to this node.
            </DialogContentText>
          </DialogContent>
        </ConfirmDialog>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
