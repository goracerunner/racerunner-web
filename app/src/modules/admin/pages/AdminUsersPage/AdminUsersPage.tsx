import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import UserList from "../../components/UserList";

/**
 * TODO: add description
 */
export const AdminUsersPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.title}>
        <b>Users</b>
      </Typography>
      <UserList />
    </Container>
  );
};
