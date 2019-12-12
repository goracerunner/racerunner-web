import React, { FC } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import { Team } from "../../../../types/team";
import { NodeMeta } from "../../../../types/node";

import CheckResponseDialog from "../CheckResponseDialog";
import { ResponsePreviewProps } from "./types";

/**
 * This component shows a preview of a response from a team.
 */
export const ResponsePreview: FC<ResponsePreviewProps> = ({
  race,
  node,
  response
}) => {
  const store = useFirestore();
  const raceRef = store.collection("races").doc(race.uid);
  const nodeRef = raceRef.collection("nodes").doc(node.nodeId);

  const [showResponse, openResponse, closeResponse] = useBooleanState(false);

  const [team, teamLoading, teamError] = useDocumentData<Team>(
    raceRef.collection("teams").doc(response.teamId)
  );
  const [meta, metaLoading, metaError] = useDocumentData<NodeMeta>(
    nodeRef.collection("protected").doc("meta")
  );

  useErrorLogging(
    "ResponsePreview",
    `An error occurred when retrieving the team for the repsonse ${response.responseId}.`,
    teamError
  );
  useErrorLogging(
    "ResponsePreview",
    `An error occurred when retrieving the node metadata for the repsonse ${response.responseId}.`,
    metaError
  );

  const loading = teamLoading || metaLoading;

  return (
    <>
      <ListItem button onClick={openResponse}>
        <ListItemText
          primary={<>Response for {meta ? <b>{meta.name}</b> : node.nodeId}</>}
          secondary={`From ${team ? team.name : "..."}`}
        />
        <ListItemSecondaryAction>
          {loading ? (
            <CircularProgress size="1rem" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              {moment(response.date.toDate()).fromNow()}
            </Typography>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {team && meta && (
        <CheckResponseDialog
          open={showResponse}
          onClose={closeResponse}
          race={race}
          team={team}
          node={node}
          meta={meta}
          response={response}
        />
      )}
      <Divider />
    </>
  );
};
