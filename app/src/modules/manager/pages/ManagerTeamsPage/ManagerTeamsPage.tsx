import React, { useContext } from "react";

import { useBooleanState } from "../../../base/hooks/useStateFactory";

import RaceContext from "../../../core/contexts/RaceContext";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import CreateTeamDialog from "../../components/CreateTeamDialog";
import TeamList from "../../components/TeamList";

import { Nullable } from "../../../../types/global";

// import useStyles from "./styles";

/**
 * This page shows the teams for the selected race.
 */
export const ManagerTeamsPage: React.FC = () => {
  const { race } = useContext(RaceContext);

  const [showAddTeam, openAddTeam, closeAddTeam] = useBooleanState(false);

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = (
      <>
        <TeamList raceId={race.uid} onAddTeam={openAddTeam} />
        <CreateTeamDialog
          open={showAddTeam}
          onClose={closeAddTeam}
          raceId={race.uid}
        />
      </>
    );
  }

  return <ManagerPageContainer title="Teams">{content}</ManagerPageContainer>;
};
