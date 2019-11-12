import React, { FC, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import Loading from "../../../core/components/Loading";
import Error from "../../../core/components/Error";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { text } from "../../../../utils";

import { Nullable } from "../../../../types/global";
import { UserProfile } from "../../../../types/users";

import { AddManagerDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog allows users to be selected to be added to a race as managers.
 */
export const AddManagerDialog: FC<AddManagerDialogProps> = ({
  race,
  open,
  onClose
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (uid: string) => () => {
    const currentIndex = checked.indexOf(uid);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(uid);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Reset checked list when the dialog opens.
  useEffect(() => {
    if (open) setChecked([]);
  }, [open]);

  const [participants, loading, error] = useCollectionData<UserProfile>(
    store
      .collection("races")
      .doc(race.uid)
      .collection("participants")
  );

  const onSaveHandler = async () => {
    onClose();
    if (participants && checked.length) {
      const users = checked
        .map(uid => participants.find(p => p.uid === uid))
        .filter(u => Boolean(u))
        .map(u => u as UserProfile);

      let count = 0;
      await Promise.all(
        users.map(async user => {
          // FIXME: Move these Firestore calls to a RaceModel class.
          const raceRef = store.collection("races").doc(race.uid);
          await raceRef
            .collection("managers")
            .doc(user.uid)
            .set(user);
          await raceRef
            .collection("participants")
            .doc(user.uid)
            .delete();
          count += 1;
        })
      );

      if (count) {
        enqueueSnackbar(`Added ${count} ${text.pluralise("manager", count)}.`, {
          variant: "success"
        });
      } else {
        enqueueSnackbar(`Failed to add managers.`, {
          variant: "error"
        });
      }
    }
  };

  let content: Nullable<JSX.Element> = null;

  if (loading) {
    content = <Loading />;
  }

  if (error) {
    content = <Error error={error} caption="Failed to load users." />;
  }

  if (participants) {
    const eligibleManagers = participants.filter(
      p => !race.managerIds.includes(p.uid)
    );
    if (eligibleManagers.length === 0) {
      content = (
        <Typography variant="body1" color="error">
          No managers available.
        </Typography>
      );
    } else {
      content = (
        <List dense className={classes.root}>
          {eligibleManagers.map(participant => {
            return (
              <ListItem
                key={participant.uid}
                button
                onClick={handleToggle(participant.uid)}
              >
                <ListItemAvatar>
                  <Avatar src={participant.photoURL} />
                </ListItemAvatar>
                <ListItemText primary={participant.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(participant.uid)}
                    checked={checked.indexOf(participant.uid) !== -1}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      );
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        Add managers to <b>{race.name}</b>
      </DialogTitle>
      <DialogContent className={classes.text}>
        <DialogContentText>
          A user must be assigned the <b>manager</b> role by an administrator
          before they can manage a race. They must have also joined this race
          before they can be assigned as a manager.
        </DialogContentText>
      </DialogContent>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={onSaveHandler}
          color="primary"
          variant="contained"
          disabled={checked.length === 0}
        >
          Add as managers
        </Button>
      </DialogActions>
    </Dialog>
  );
};
