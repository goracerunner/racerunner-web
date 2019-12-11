import React, { useContext } from "react";
import { useParams } from "react-router";

import Container from "@material-ui/core/Container";

import { Nullable } from "../../../../types/global";

import RaceContext from "../../../core/contexts/RaceContext";

import RaceInProgressContainer from "../../components/RaceInProgressContainer";
import NodeDisplay from "../../components/NodeDisplay";

// import useStyles from "./styles";

/**
 * This page shows details about a node.
 */
export const RaceViewNodePage: React.FC = () => {
  const { nodeId } = useParams();
  const { race, team } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (race && team && nodeId) {
    content = <NodeDisplay race={race} team={team} nodeId={nodeId} />;
  }

  return (
    <RaceInProgressContainer title="Challenge">
      <Container maxWidth="sm">{content}</Container>
    </RaceInProgressContainer>
  );
};
