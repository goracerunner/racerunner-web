import React, { FC } from "react";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

import { useDisplayStyles } from "../styles";
import { RoleSwitchProps } from "../types";

/**
 * This component renders a switch with a caption.
 */
export const RoleSwitch: FC<RoleSwitchProps> = ({
  checked,
  label,
  onChange,
  helperText
}) => {
  const classes = useDisplayStyles();
  return (
    <FormControl component="fieldset" className={classes.switch}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label={label}
      />
      {helperText && (
        <FormHelperText className={classes.helperText}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
