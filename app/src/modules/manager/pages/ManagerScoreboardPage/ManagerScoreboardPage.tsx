import React from "react";

import Typography from "@material-ui/core/Typography";

import ManagerPageContainer from "../../components/ManagerPageContainer";

// import useStyles from "./styles";

/**
 * TODO: add description
 */
export const ManagerScoreboardPage: React.FC = () => {
  return (
    <ManagerPageContainer title="Scoreboard">
      <Typography variant="button" color="error">
        <b>This feature is currently unavailable.</b>
      </Typography>
    </ManagerPageContainer>
  );
};
