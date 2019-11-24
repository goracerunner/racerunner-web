import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";
import ExpandIcon from "@material-ui/icons/ExpandMore";

import { useFirestore } from "../../../core/hooks/useFirebase";

import Loading from "../../../core/components/Loading";
import Property from "../../../core/components/Property";

import RegistrationField from "../../../race/components/RegistrationField";

import { RaceRegistrationField } from "../../../../types/race";

import { ValidationDisplay } from "./ValidationDisplay";
import { RegistrationFieldEditorProps } from "./types";
import useStyles from "./styles";

/**
 * This component displays details about a race's registration
 * fields and provides controls to edit them.
 */
export const RegistrationFieldEditor: FC<RegistrationFieldEditorProps> = ({
  raceId
}) => {
  const classes = useStyles();

  const store = useFirestore();
  const [fields, loading, error] = useCollectionData<RaceRegistrationField>(
    store
      .collection("races")
      .doc(raceId)
      .collection("registrationFields")
      .orderBy("order")
  );

  return (
    <>
      {loading && <Loading />}
      {error && (
        <div className={classes.error}>
          <Tooltip title={error.toString()} placement="right">
            <Typography variant="caption" color="error">
              Failed to load registration fields.
            </Typography>
          </Tooltip>
        </div>
      )}
      {fields &&
        fields.map(field => (
          <ExpansionPanel key={field.name}>
            <ExpansionPanelSummary expandIcon={<ExpandIcon />}>
              <Typography color="textPrimary">
                <Property title="Field Id">{field.name}</Property>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.details}>
                <Property title="Type">{field.type}</Property>
                {/* <Property title="Order">{field.order.toString()}</Property> */}
                {field.validation && (
                  <Property title="Validation">
                    <ValidationDisplay validation={field.validation} />
                  </Property>
                )}
                {field.managersOnly && (
                  <Property title="Managed field">
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      component="div"
                    >
                      This field is hidden from users and can only be seen and
                      modified by managers.
                    </Typography>
                  </Property>
                )}
                {field.prefilled && (
                  <Property title="Prefill macro">{field.prefilled}</Property>
                )}
                <Property title="Preview">
                  <div>
                    <RegistrationField
                      field={field}
                      value={null}
                      setValue={() => {}}
                    />
                  </div>
                </Property>
                {/* TODO: Implement edit button */}
                <Button color="primary" className={classes.edit} disabled>
                  <EditIcon className={classes.editIcon} />
                  Edit field
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </>
  );
};
