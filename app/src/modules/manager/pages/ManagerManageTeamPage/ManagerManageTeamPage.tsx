import React from "react";

import Typography from "@material-ui/core/Typography";

import ManagerPageContainer from "../../components/ManagerPageContainer";

// import useStyles from "./styles";

/**
 * TODO: add description
 */
export const ManagerManageTeamPage: React.FC = () => {
  return (
    <ManagerPageContainer title="Manage Team">
      <Typography variant="button" color="error">
        <b>This feature is currently unavailable.</b>
      </Typography>
    </ManagerPageContainer>
  );
};
