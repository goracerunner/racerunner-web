import React, { useContext } from "react";
import { useParams } from "react-router";

import { Nullable } from "../../../../types/global";

import RaceContext from "../../../core/contexts/RaceContext";

import BackButton from "../../../base/components/BackButton";
import ManagerPageContainer from "../../components/ManagerPageContainer";
import TeamProfile from "../../components/TeamProfile";

import useStyles from "./styles";

/**
 * This page provides controls for a race manage to manage a team.
 */
export const ManagerManageTeamPage: React.FC = () => {
  const classes = useStyles();
  const { teamId } = useParams();
  const { race } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (teamId && race) {
    content = <TeamProfile race={race} teamId={teamId} />;
  }

  return (
    <ManagerPageContainer title="Manage Team">
      <BackButton className={classes.back} />
      {content}
    </ManagerPageContainer>
  );
};
