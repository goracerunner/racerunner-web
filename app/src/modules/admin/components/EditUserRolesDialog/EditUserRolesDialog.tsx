import React, { FC } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import {
  useFirestore,
  useFirestoreData
} from "../../../core/hooks/useFirebase";
import { DataProvider } from "../../../core/contexts/DataContext";

import DataDisplayWrapper from "../../../core/components/DataDisplayWrapper";

import { RoleSelector } from "./parts/RoleSelector";

import { EditUserRolesDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This dialog shows a which roles a user currently has (based on
 * their claims) and allows roles to be assigned and unassigned.
 */
export const EditUserRolesDialog: FC<EditUserRolesDialogProps> = ({
  open,
  onClose,
  user
}) => {
  const classes = useStyles();

  const store = useFirestore();
  const claimsDetails = useFirestoreData(
    useDocumentData(store.doc(`users/${user.uid}/private/claims`))
  );

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogTitle>
        <div className={classes.title}>
          <Avatar src={user.photoURL} className={classes.avatar} />
          <div>
            <Typography>
              <b>{user.name}</b>
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Modify {user.name}'s roles
            </Typography>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DataProvider {...claimsDetails}>
          <DataDisplayWrapper>
            <RoleSelector user={user} />
          </DataDisplayWrapper>
        </DataProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
