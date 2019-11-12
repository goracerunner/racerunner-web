import React, { useContext } from "react";

import RaceContext from "../../../core/contexts/RaceContext";

import RegistrationList from "../../components/RegistrationList";
import ManagerPageContainer from "../../components/ManagerPageContainer";

import { Nullable } from "../../../../types/global";

// import useStyles from "./styles";

/**
 * This page shows the list of registrations for a race.
 */
export const ManagerRegistrationsPage: React.FC = () => {
  const { race } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = <RegistrationList raceId={race.uid} />;
  }

  return (
    <ManagerPageContainer title="Registrations" maxWidth="xl">
      {content}
    </ManagerPageContainer>
  );
};
