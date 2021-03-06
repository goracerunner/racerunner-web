import React, { FC } from "react";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

import { Logger } from "../../../../utils";

import MarkdownRenderer from "../../../core/components/MarkdownRenderer";

import { RegistrationFieldProps } from "./types";
import useStyles from "./styles";

/**
 * This component takes in a field configuration and displays the
 * appropriate form controls for the field.
 */
export const RegistrationField: FC<RegistrationFieldProps> = ({
  field,
  value,
  setValue,
  disabled,
  error
}) => {
  const classes = useStyles();

  const {
    type,
    name,
    label,
    description,
    default: defaultvalue,
    placeholder,
    values
  } = field;

  switch (type) {
    case "markdown": {
      return (
        <div className={classes.field}>
          <MarkdownRenderer source={description} />
        </div>
      );
    }

    case "text":
    case "number":
    case "longtext": {
      return (
        <TextField
          fullWidth
          multiline={type === "longtext"}
          type={type === "number" ? "number" : "text"}
          className={classes.field}
          label={label}
          helperText={error || description}
          error={Boolean(error)}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultvalue}
          value={value || ""}
          onChange={e => setValue(e.target.value)}
        />
      );
    }

    case "listcustom":
    case "list": {
      if (values) {
        return (
          <FormControl
            component="fieldset"
            className={clsx(classes.field, classes.list)}
            disabled={disabled}
            error={Boolean(error)}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <FormHelperText>{error || description}</FormHelperText>
            <RadioGroup
              value={value || ""}
              onChange={e => setValue(e.target.value)}
            >
              {values.map(option => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio checked={option === value} />}
                  label={option}
                />
              ))}
              {type === "listcustom" && (
                <FormControlLabel
                  label=""
                  control={
                    <>
                      <Radio
                        checked={Boolean(value) && !values.includes(value)}
                      />
                      <TextField
                        value={values.includes(value) ? "" : value || ""}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Other..."
                      />
                    </>
                  }
                />
              )}
            </RadioGroup>
          </FormControl>
        );
      }
      break;
    }

    // FIXME: not implemented yet.
    case "checkbox":
    case "select": {
      Logger.error("RegistrationField", `${type} field not implemented`);
      break;
    }
  }

  return (
    <Typography variant="body2" color="error" className={classes.field}>
      Field "{name}" is not available.
    </Typography>
  );
};
