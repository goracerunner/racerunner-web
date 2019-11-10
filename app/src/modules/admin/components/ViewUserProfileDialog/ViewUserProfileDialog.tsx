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

import { DetailsDisplay } from "./parts/DetailsDisplay";
import { ClaimsDisplay } from "./parts/ClaimsDisplay";

import { ViewUserProfileDialogProps } from "./types";
import useStyles from "./styles";

/**
 * This component shows a user's profile information and claims.
 */
export const ViewUserProfileDialog: FC<ViewUserProfileDialogProps> = ({
  open,
  onClose,
  user
}) => {
  const classes = useStyles();

  // Get user profile data
  const store = useFirestore();
  const details = useFirestoreData(
    useDocumentData(store.doc(`users/${user.uid}/protected/details`))
  );
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
              {user.uid}
            </Typography>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DataProvider {...details}>
          <DataDisplayWrapper>
            <DetailsDisplay />
          </DataDisplayWrapper>
        </DataProvider>
        <DataProvider {...claimsDetails}>
          <DataDisplayWrapper>
            <ClaimsDisplay />
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
