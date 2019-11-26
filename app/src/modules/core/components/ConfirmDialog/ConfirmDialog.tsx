import React, { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { ConfirmDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This is a customisable dialog that renders a message and
 * a cancel and confirm button that can be used to confirm a
 * user's action.
 */
export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  children,
  open,
  onClose,
  title,
  confirmText = "OK",
  styles = {},
  onConfirm = () => {},
  onCancel = onClose,
  ...dialogProps
}) => {
  const { cancelButton, confirmButton } = styles;
  return (
    <Dialog open={open} onClose={onClose} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      {children}
      <DialogActions>
        <Button className={cancelButton} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={confirmButton}
          onClick={onConfirm}
        >
          <b>{confirmText}</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
