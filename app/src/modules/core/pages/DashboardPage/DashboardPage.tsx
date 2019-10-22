import React, { useContext } from "react";

import { Nullable } from "../../../../types/global";

import DashboardModePage from "../../../dashboard/pages/DashboardModePage";
import RaceModePage from "../../../race/pages/RaceModePage";
import ManageModePage from "../../../manage/pages/ManageModePage";

import { useAppDrawerState } from "../../hooks/useNavigation";
import AppModeContext from "../../contexts/AppModeContext";

import Protected from "../../components/Protected";
import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";
import { RaceProvider } from "../../contexts/RaceContext";
import AuthenticationContext from "../../contexts/AuthenticationContext";

/**
 * The dashboard page renders the appropriate
 * dashboard based on the app state.
 */
export const DashboardPage: React.FC = () => {
  const [menuOpen, openDrawer, closeDrawer] = useAppDrawerState();
  const { user } = useContext(AuthenticationContext);
  const { mode, raceId } = useContext(AppModeContext);

  let content: Nullable<JSX.Element> = null;

  switch (mode) {
    case "dashboard": {
      content = <DashboardModePage />;
      break;
    }
    case "race": {
      if (user && user.uid && raceId) {
        content = (
          <RaceProvider raceId={raceId} userId={user.uid}>
            <RaceModePage />
          </RaceProvider>
        );
      }
      break;
    }
    case "manage": {
      if (user && user.uid && raceId) {
        content = <ManageModePage />;
      }
      break;
    }
  }

  return (
    <Protected>
      <AppDrawer open={menuOpen} onClose={closeDrawer}>
        <AppBar onDrawerOpen={openDrawer} />
        {content}
      </AppDrawer>
    </Protected>
  );
};
