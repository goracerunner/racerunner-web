import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import { Response } from "../../../../types/node";

import { ResponsePreview } from "./ResponsePreview";
import { ResponseListProps } from "./types";
// import useStyles from "./styles";

/**
 * TODO: Add description
 */
export const ResponseList: FC<ResponseListProps> = ({ type, race, node }) => {
  const store = useFirestore();

  const [responses, responsesLoading, responsesError] = useCollectionData<
    Response
  >(
    store
      .collection("races")
      .doc(race.uid)
      .collection("nodes")
      .doc(node.nodeId)
      .collection("responses")
      .where("checked", "==", type === "checked" ? true : false)
      .orderBy("date", "desc")
  );

  useErrorLogging(
    "ResponseList",
    "An error occurred when retrieving responses",
    responsesError
  );

  if (!responsesLoading && responses) {
    return (
      <>
        {responses.map(response => (
          <ResponsePreview
            key={response.responseId}
            race={race}
            node={node}
            response={response}
          />
        ))}
      </>
    );
  }

  return null;
};
