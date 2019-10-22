import React, { useContext } from "react";

import { useAppDrawerState } from "../../hooks/useNavigation";
import AppModeContext from "../../contexts/AppModeContext";

import Protected from "../../components/Protected";
import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";

import { DashboardMode } from "./DashboardMode";
import { RaceMode } from "./RaceMode";
import { ManageMode } from "./ManageMode";

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
      content = <DashboardMode />;
      break;
    }
    case "race": {
      content = <RaceMode />;
      break;
    }
    case "manage": {
      content = <ManageMode />;
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
