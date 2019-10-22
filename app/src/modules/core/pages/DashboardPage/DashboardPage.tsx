import React, { useContext } from "react";

import { useAppDrawerState } from "../../hooks/useNavigation";
import AppModeContext from "../../contexts/AppModeContext";

import Protected from "../../components/Protected";
import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";

import DashboardModePage from "../../../dashboard/pages/DashboardModePage";
import RaceModePage from "../../../race/pages/RaceModePage";
import ManageModePage from "../../../manage/pages/ManageModePage";

/**
 * The dashboard page renders the appropriate
 * dashboard based on the app state.
 */
export const DashboardPage: React.FC = () => {
  const [menuOpen, openDrawer, closeDrawer] = useAppDrawerState();
  const { mode } = useContext(AppModeContext);

  let content: JSX.Element;
  switch (mode) {
    default:
    case "dashboard": {
      content = <DashboardModePage />;
      break;
    }
    case "race": {
      content = <RaceModePage />;
      break;
    }
    case "manage": {
      content = <ManageModePage />;
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
