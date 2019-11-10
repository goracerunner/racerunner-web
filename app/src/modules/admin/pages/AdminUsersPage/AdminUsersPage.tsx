import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import UserList from "../../components/UserList";

import useStyles from "./styles";

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
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.info}
      >
        This list shows all the users in the system, including race managers and
        administrators.
      </Typography>
      <UserList />
    </Container>
  );
};
