import React, { FC, useEffect, useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

import { RaceRegistrationField } from "../../../../types/race";

import { REGO_FORM_ERROR } from "../../../../config/snackbarKey";

import Loader from "../../../base/components/Loader";
import Container from "../../../base/components/Container";
import { useMapState } from "../../../base/hooks/useStateFactory";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { usePredicateFeedback } from "../../../core/hooks/useFeedbackHooks";
import AppModeContext from "../../../core/contexts/AppModeContext";
import AuthenticationContext from "../../../core/contexts/AuthenticationContext";

import RegistrationField from "../RegistrationField";

import { validateFields } from "./validation";
import { RegistrationFormProps } from "./types";
import useStyles from "./styles";

/**
 * This component retrieves the registration form data for the
 * given race and displays the fields for the user to fill in.
 */
export const RegistrationForm: FC<RegistrationFormProps> = ({
  race,
  onRegister
}) => {
  const classes = useStyles();

  const { setMode } = useContext(AppModeContext);
  const { user } = useContext(AuthenticationContext);

  const [loading, setLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [formValues, setValue, setValues] = useMapState();
  const formErrorHooks = useMapState();
  const formErrors = formErrorHooks[0];
  const setFormErrors = formErrorHooks[2];

  // Retrieve race registration form data.
  const store = useFirestore();
  const [fields, fieldsLoading] = useCollectionData<RaceRegistrationField>(
    store
      .collection("races")
      .doc(race.uid)
      .collection("registrationFields")
      .orderBy("order")
  );

  const showError = usePredicateFeedback("error", REGO_FORM_ERROR);

  // Redirect to dashboard if the form fails to load.
  useEffect(() => {
    showError(
      "Failed to load registration form.",
      () => Boolean(!fieldsLoading && !fields),
      () => setMode("dashboard")
    );
  }, [showError, setMode, fieldsLoading, fields]);

  // Populate any pre-filled fields
  useEffect(() => {
    if (user && fields && !prefilled) {
      // Do not prefill more than once
      setPrefilled(true);

      // Store fields that are prefilled
      const prefilledFields: { [key: string]: string } = {};

      // Iterate through fields to find any that need to be prefilled.
      fields.forEach(field => {
        const { name, prefilled: prefilledId } = field;

        // If the field is not already filled and it should be prefilled
        if (!formValues[name] && prefilledId) {
          // Match known prefil ids
          switch (prefilledId) {
            case "user.name": {
              prefilledFields[name] = user.displayName!;
              break;
            }
            case "user.email": {
              prefilledFields[name] = user.email!;
              break;
            }
          }
        }
      });

      if (Object.keys(prefilledFields).length > 0) {
        setValues(prefilledFields);
      }
    }
  }, [user, fields, prefilled, setPrefilled, formValues, setValues]);

  // Reset any errors when the form values are changed.
  useEffect(() => {
    setFormErrors({});
  }, [formValues, setFormErrors]);

  if (fieldsLoading) {
    return <Loader message="Loading registration form..." />;
  }

  if (user && fields) {
    if (fields.length === 0) {
      // If there are no fields, just register the user.
      setLoading(true);
      onRegister(user.uid, {});
    } else {
      const onRegisterHandler = () => {
        setLoading(true);

        // Validate fields
        const errors = validateFields(fields, formValues);

        if (Object.keys(errors).length > 0) {
          // Set errors
          setFormErrors(errors);
          setLoading(false);
          window.scroll({ top: 0, behavior: "smooth" });
          showError("Form contains errors!", () => true);
        } else {
          // If valid, send registration
          onRegister(user.uid, formValues);
        }
      };

      return (
        <Container>
          <Typography variant="h2" className={classes.title}>
            Register
          </Typography>
          <Paper className={classes.blurb}>
            <Typography variant="h6">Welcome to {race.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Please fill the following form to register!
            </Typography>
          </Paper>
          <Paper className={classes.form}>
            <div className={classes.fields}>
              {fields.map(field => (
                <div key={field.name}>
                  <RegistrationField
                    disabled={loading}
                    field={field}
                    value={formValues[field.name]}
                    setValue={value => setValue(field.name, value)}
                    error={formErrors[field.name]}
                  />
                </div>
              ))}
            </div>
            <Button
              disabled={loading}
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              className={classes.button}
              onClick={onRegisterHandler}
            >
              {loading && (
                <CircularProgress
                  color="primary"
                  size="1.5rem"
                  className={classes.loader}
                />
              )}
              Register
            </Button>
            <Typography variant="caption" color="textSecondary">
              By continuing, you are indicating that you accept our{" "}
              <Link className="dark link" to="/terms">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="dark link" to="/privacy">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Paper>
        </Container>
      );
    }
  }

  // TODO: return something when fields are null
  return null;
};
