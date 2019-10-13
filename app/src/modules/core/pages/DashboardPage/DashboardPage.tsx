import React from "react";

import { useAppDrawerState } from "../../hooks/useNavigation";
import Protected from "../../components/Protected";
import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const DashboardPage: React.FC = () => {
  const classes = useStyles();
  const [menuOpen, openDrawer, closeDrawer] = useAppDrawerState();

  return (
    <Protected>
      <AppDrawer open={menuOpen} onClose={closeDrawer}>
        <AppBar onDrawerOpen={openDrawer} />
      </AppDrawer>
    </Protected>
  );
};
