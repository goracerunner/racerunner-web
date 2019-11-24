import React, { FC, useEffect } from "react";
import { useSnackbar } from "notistack";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useFirestore } from "../../../core/hooks/useFirebase";

import { useMapState } from "../../../base/hooks/useStateFactory";

import RegistrationField from "../../../race/components/RegistrationField";

import { EditRegistrationManagedFieldsDialogProps } from "./types";
// import useStyles from "./styles";

/**
 * This dialog renders the managed fields for a user's registration for editing.
 */
export const EditRegistrationManagedFieldsDialog: FC<EditRegistrationManagedFieldsDialogProps> = ({
  open,
  onClose,
  raceId,
  managedFields,
  registration
}) => {
  const store = useFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setValue, setValues] = useMapState();
  const formErrorHooks = useMapState();
  const formErrors = formErrorHooks[0];
  const setFormErrors = formErrorHooks[2];

  // Reset values when the dialog opens.
  useEffect(() => {
    if (open) {
      // Pre-populate with registration values if already set
      const knownValues: { [key: string]: any } = {};
      managedFields.forEach(field => {
        if (registration[field.name]) {
          knownValues[field.name] = registration[field.name];
        }
      });
      setValues(knownValues);
    }
  }, [open, setFormErrors, registration, managedFields, setValues]);

  // Reset any errors when the form values are changed.
  useEffect(() => {
    setFormErrors({});
  }, [formValues, setFormErrors]);

  const onSaveHandler = async () => {
    onClose();
    await store
      .collection("races")
      .doc(raceId)
      .collection("registrations")
      .doc(registration.id)
      .update(formValues);
    enqueueSnackbar(`Registration for ${registration.name} updated.`, {
      variant: "success"
    });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <DialogTitle>
        Managed fields for <b>{registration.name}</b>
      </DialogTitle>
      <DialogContent>
        {managedFields.length > 0 ? (
          <>
            <DialogContentText>
              Managed fields are only viewable by race managers.
            </DialogContentText>
            {managedFields.map(field => (
              <RegistrationField
                key={field.name}
                field={field}
                value={formValues[field.name]}
                setValue={value => setValue(field.name, value)}
                error={formErrors[field.name]}
              />
            ))}
          </>
        ) : (
          <DialogContentText>
            There are no managed fields available.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {managedFields.length > 0 && (
          <Button onClick={onSaveHandler} color="primary" variant="contained">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
