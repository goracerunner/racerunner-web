import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { useErrorLogging } from "../../../base/hooks/useLogging";

import { Response, ResponseCheck } from "../../../../types/node";

import { NodeCard } from "./NodeCard";
import { NodeContainerProps } from "./types";

export const NodeContainer: FC<NodeContainerProps> = ({
  race,
  team,
  state,
  node
}) => {
  const store = useFirestore();

  const nodeRef = store
    .collection("races")
    .doc(race.uid)
    .collection("nodes")
    .doc(node.nodeId);

  // Check if the node has a response
  const [responses, responsesLoading, responsesError] = useCollectionData<
    Response
  >(
    nodeRef
      .collection("responses")
      .where("teamId", "==", team.teamId)
      .orderBy("date", "desc")
  );

  // Check if the node has a check
  const [checks, checksLoading, checksError] = useCollectionData<ResponseCheck>(
    nodeRef
      .collection("checks")
      .where("teamId", "==", team.teamId)
      .orderBy("date", "desc")
  );

  useErrorLogging(
    "NodeCard",
    `An error occurred when retrieving responses for node ${node.nodeId}`,
    responsesError
  );

  useErrorLogging(
    "NodeCard",
    `An error occurred when retrieving checks for node ${node.nodeId}`,
    checksError
  );

  let canRender = false;

  // If there is no state filter, just render the card as usual.
  if (!state) {
    canRender = true;
  }
  // Otherwise, check if the card can be rendered according to the requested state.
  else if (!responsesLoading && !checksLoading && responses && checks) {
    const lastResponse = responses[0];
    const lastCheck = checks[0];

    switch (state) {
      case "new": {
        // Render if:
        // - there has been no response
        // - the response has been checked and can retry
        canRender =
          !lastResponse || (lastResponse && lastCheck && lastCheck.retry);
        break;
      }
      case "pending": {
        // Render if:
        // - there is a response but no matching check
        canRender =
          lastResponse &&
          lastCheck &&
          lastCheck.responseId !== lastResponse.responseId;
        break;
      }
      case "completed": {
        // Render if:
        // - there is a response and a matching check that cannot retry
        canRender =
          lastResponse &&
          lastCheck &&
          lastCheck.responseId === lastResponse.responseId &&
          lastCheck.retry;
        break;
      }
    }
  }

  return canRender ? <NodeCard node={node} race={race} /> : null;
};
