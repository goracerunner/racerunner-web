import React, { useContext } from "react";

import Container from "@material-ui/core/Container";

import AuthenticationContext from "../../../core/contexts/AuthenticationContext";
import RaceContext from "../../../core/contexts/RaceContext";

import Loading from "../../../core/components/Loading";
import RaceInProgressContainer from "../../components/RaceInProgressContainer";
import PageTitle from "../../components/PageTitle";
import NodesList from "../../components/NodesList";

import { Nullable } from "../../../../types/global";

// import useStyles from "./styles";

/**
 * This page renders a list of challenges for the current team.
 */
export const RaceNodesCompletedPage: React.FC = () => {
  const { user } = useContext(AuthenticationContext);
  const { loading, race, team } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (loading) {
    content = <Loading />;
  }

  if (!loading && race && user && team) {
    content = (
      <NodesList race={race} team={team} user={user} state="completed" />
    );
  }

  return (
    <RaceInProgressContainer title="Challenges">
      <Container maxWidth="sm">
        <PageTitle title="Challenges" subtitle="Completed challenges" />
        {content}
      </Container>
    </RaceInProgressContainer>
  );
};
