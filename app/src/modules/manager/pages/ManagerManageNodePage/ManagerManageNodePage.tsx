import React, { useContext } from "react";
import { useParams } from "react-router";

import { Nullable } from "../../../../types/global";

import RaceContext from "../../../core/contexts/RaceContext";

import BackButton from "../../../base/components/BackButton";
import ManagerPageContainer from "../../components/ManagerPageContainer";
import NodeProfile from "../../components/NodeProfile";

import useStyles from "./styles";

/**
 * This page provides controls for a race manager to manage a node.
 */
export const ManagerManageNodePage: React.FC = () => {
  const classes = useStyles();
  const { nodeId } = useParams();
  const { race } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (nodeId && race) {
    content = <NodeProfile race={race} nodeId={nodeId} />;
  }

  return (
    <ManagerPageContainer title="Manage Node">
      <BackButton className={classes.back} />
      {content}
    </ManagerPageContainer>
  );
};
