import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AddIcon from "@material-ui/icons/Add";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { pluralise } from "../../../../utils/text";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";

import { Team } from "../../../../types/team";

import { TeamListProps } from "./types";
import useStyles from "./styles";

/**
 * This component shows the list of teams for the selected race.
 */
export const TeamList: FC<TeamListProps> = ({ onAddTeam, raceId }) => {
  const classes = useStyles();

  const store = useFirestore();
  const [teams, loading, error] = useCollectionData<Team>(
    store
      .collection("races")
      .doc(raceId)
      .collection("teams")
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

  if (teams) {
    return (
      <Paper>
        <List className={classes.list}>
          {teams.length === 0 && (
            <Typography color="textSecondary" className={classes.empty}>
              No teams yet
            </Typography>
          )}
          {teams.length > 0 &&
            teams.map(team => (
              <ListItem
                key={team.uid}
                button
                component={Link}
                to={`/manage/teams/${team.uid}`}
              >
                <ListItemText
                  primary={team.name}
                  secondary={`${team.memberIds.length} ${pluralise(
                    "member",
                    team.memberIds.length
                  )}`}
                />
              </ListItem>
            ))}
        </List>
        <Divider />
        <ListItem button onClick={onAddTeam}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" color="textSecondary">
              Add a new team
            </Typography>
          </ListItemText>
        </ListItem>
      </Paper>
    );
  }

  return null;
};
