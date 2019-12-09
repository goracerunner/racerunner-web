import React, { useContext } from "react";

import { useBooleanState } from "../../../base/hooks/useStateFactory";

import RaceContext from "../../../core/contexts/RaceContext";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import CreateNodeDialog from "../../components/CreateNodeDialog";
import NodeList from "../../components/NodeList";

import { Nullable } from "../../../../types/global";

// import useStyles from "./styles";

/**
 * This component renders a dialog for creating a new node.
 */
export const ManagerNodesPage: React.FC = () => {
  const { race } = useContext(RaceContext);

  const [showAddNode, openAddNode, closeAddNode] = useBooleanState(false);

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = (
      <>
        <NodeList raceId={race.uid} onAddNode={openAddNode} />
        <CreateNodeDialog
          open={showAddNode}
          onClose={closeAddNode}
          raceId={race.uid}
        />
      </>
    );
  }

  return <ManagerPageContainer title="Nodes">{content} </ManagerPageContainer>;
};
