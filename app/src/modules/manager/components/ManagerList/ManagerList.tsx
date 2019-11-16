import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Clear";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";

import { UserProfile } from "../../../../types/users";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { ManagerListProps } from "./types";
// import useStyles from "./styles";

/**
 * This component shows the list of the current managers for the specified race.
 */
export const ManagerList: FC<ManagerListProps> = ({
  raceId,
  onAddManager,
  onSelectManager
}) => {
  const store = useFirestore();
  const [managers, loading, error] = useCollectionData<UserProfile>(
    store
      .collection("races")
      .doc(raceId)
      .collection("managers")
  );

  if (loading) {
    return <Loading margin="8rem" />;
  }

  if (error) {
    return (
      <Error
        error={error}
        caption="Failed to load managers."
        margin="8rem"
        iconSize="4rem"
      />
    );
  }

  if (managers) {
    return (
      <Paper>
        <List>
          {managers.map(manager => (
            <ListItem key={manager.uid}>
              <ListItemAvatar>
                <Avatar src={manager.photoURL} />
              </ListItemAvatar>
              <ListItemText primary={manager.name} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onSelectManager(manager)}>
                  <RemoveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem button onClick={onAddManager}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" color="textSecondary">
              Add managers
            </Typography>
          </ListItemText>
        </ListItem>
      </Paper>
    );
  }

  return null;
};
