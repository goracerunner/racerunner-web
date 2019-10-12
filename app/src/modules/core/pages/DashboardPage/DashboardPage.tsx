import React from "react";

import Button from "@material-ui/core/Button";

import { useAuth } from "../../hooks/useFirebase";
import Protected from "../../components/Protected";

import useStyles from "./styles";

/**
 * TODO: add description
 */
export const DashboardPage: React.FC = () => {
  const classes = useStyles();
  const auth = useAuth();
  return (
    <Protected>
      <div className={classes.root}>
        <Button onClick={() => (window.location.href = "/logout")}>
          Sign out
        </Button>
      </div>
    </Protected>
  );
};
