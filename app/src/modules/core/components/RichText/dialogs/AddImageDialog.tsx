import React, { FC, useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useImageDialogStyles } from "../styles";
import { AddImageDialogProps } from "../types";

/**
 * This dialog adds an image using a URL.
 */
export const AddImageDialog: FC<AddImageDialogProps> = ({
  open,
  onClose,
  onConfirm
}) => {
  const classes = useImageDialogStyles();
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (open) {
      setUrl("");
      setValid(false);
    }
  }, [open, setUrl, setValid]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Image URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <div className={classes.preview}>
          <img
            className={classes.image}
            src={url || ""}
            alt="Upload preview"
            onLoad={() => setValid(true)}
            onError={() => setValid(false)}
          ></img>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!valid}
          onClick={() => {
            onClose();
            onConfirm(url);
          }}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
};
