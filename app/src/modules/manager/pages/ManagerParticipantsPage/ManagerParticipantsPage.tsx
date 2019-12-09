import React, { useContext, useState } from "react";

import Typography from "@material-ui/core/Typography";

import RaceContext from "../../../core/contexts/RaceContext";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import ParticipantList from "../../components/ParticipantList";
import RemoveParticipantDialog from "../../components/RemoveParticipantDialog";

import { Nullable } from "../../../../types/global";
import { UserProfile } from "../../../../types/users";
import { useBooleanState } from "../../../base/hooks/useStateFactory";

import useStyles from "./styles";

/**
 * This page shows a list of participants in the current race.
 */
export const ManagerParticipantsPage: React.FC = () => {
  const classes = useStyles();
  const { race } = useContext(RaceContext);

  const [participant, setParticipant] = useState<Nullable<UserProfile>>(null);
  const [
    showRemoveParticipant,
    openRemoveParticipant,
    closeRemoveParticipant
  ] = useBooleanState(false);

  const selectParticipantHandler = (participant: UserProfile) => {
    setParticipant(participant);
    openRemoveParticipant();
  };

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = (
      <>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.description}
        >
          Participants are users who have joined the race this race with the
          code <b>{race.uid}</b>.
        </Typography>
        <ParticipantList
          raceId={race.uid}
          registrationIds={race.registrationIds}
          onSelectParticipant={selectParticipantHandler}
        />
        {participant && (
          <RemoveParticipantDialog
            open={showRemoveParticipant}
            onClose={closeRemoveParticipant}
            race={race}
            participant={participant}
            registered={race.registrationIds.includes(participant.uid)}
          />
        )}
      </>
    );
  }

  return (
    <ManagerPageContainer title="Participants">{content}</ManagerPageContainer>
  );
};
