import React, { FC } from "react";
import JsonView from "react-json-view";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { ViewRawRegistrationDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This dialog renders a user's registration
 * data in its raw JSON format.
 */
export const ViewRawRegistrationDialog: FC<ViewRawRegistrationDialogProps> = ({
  open,
  onClose,
  registration
}) => {
  // const classes = useStyles();
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        Registration for <b>{registration.name}</b>
      </DialogTitle>
      <DialogContent>
        <JsonView
          style={{ fontSize: "1.2rem" }}
          src={registration}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          name={null}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
