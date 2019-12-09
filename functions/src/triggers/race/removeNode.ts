import * as functions from "firebase-functions";

import { document } from "../../utils/firebase";

import { RaceModel } from "../../models/RaceModel";
import { nodeRef } from "../../utils/refs";

const removeNodeHandler = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { raceId, nodeId } = context.params;
  await RaceModel.removeNodeFromNodeList(raceId, nodeId);

  console.info(`Removing subcollection documents from node <${nodeId}>...`);

  // Remove all subcollection documents
  let count = 0;
  const documents: Array<FirebaseFirestore.DocumentReference> = [];

  const getSubcollectionDocs = (name: string) =>
    nodeRef(raceId, nodeId)
      .collection(name)
      .listDocuments();

  documents.push(...(await getSubcollectionDocs("protected")));
  documents.push(...(await getSubcollectionDocs("tasks")));
  documents.push(...(await getSubcollectionDocs("responses")));
  documents.push(...(await getSubcollectionDocs("checks")));

  await Promise.all(
    documents.map(async doc => {
      await doc.delete();
      count += 1;
    })
  );

  console.info(
    `Removed ${count} subcollection document${
      count === 1 ? "" : "s"
    } from node <${nodeId}>.`
  );
};

export const removeNode = document("races/{raceId}/nodes/{nodeId}").onDelete(
  removeNodeHandler
);
