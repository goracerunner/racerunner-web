import React from "react";

import Protected from "../../components/Protected";
import AppBar from "../../components/AppBar";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const DashboardPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Protected>
      <AppBar />
    </Protected>
  );
};
