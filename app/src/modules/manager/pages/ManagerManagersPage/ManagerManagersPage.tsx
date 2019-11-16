import React, { useContext, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import RaceContext from "../../../core/contexts/RaceContext";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import ManagerList from "../../components/ManagerList";
import AddManagerDialog from "../../components/AddManagerDialog";
import RemoveManagerDialog from "../../components/RemoveManagerDialog";

import { Nullable } from "../../../../types/global";
import { UserProfile } from "../../../../types/users";

import useStyles from "./styles";

/**
 * This page shows the list of managers for the race.
 */
export const ManagerManagersPage: React.FC = () => {
  const classes = useStyles();
  const { race } = useContext(RaceContext);

  const [manager, setManager] = useState<Nullable<UserProfile>>(null);
  const [
    showRemoveManager,
    openRemoveManager,
    closeRemoveManager
  ] = useBooleanState(false);
  const [showAddManager, openAddManager, closeAddManager] = useBooleanState(
    false
  );

  const selectManagerHandler = (manager: UserProfile) => {
    setManager(manager);
    openRemoveManager();
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
          Managers have access to the race management dashboard. They cannot
          participate in races they are managing.
        </Typography>
        <ManagerList
          raceId={race.uid}
          onAddManager={openAddManager}
          onSelectManager={selectManagerHandler}
        />
        <AddManagerDialog
          race={race}
          open={showAddManager}
          onClose={closeAddManager}
        />
        {manager && (
          <RemoveManagerDialog
            race={race}
            open={showRemoveManager}
            onClose={closeRemoveManager}
            manager={manager}
          />
        )}
      </>
    );
  }

  return (
    <ManagerPageContainer title="Managers">{content}</ManagerPageContainer>
  );
};
