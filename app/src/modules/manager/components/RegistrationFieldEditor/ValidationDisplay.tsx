import React, { FC } from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { pluralise } from "../../../../utils/text";

import { ValidationDisplayProps } from "./types";

/**
 * This component displays details about a registration field's validation.
 */
export const ValidationDisplay: FC<ValidationDisplayProps> = ({
  validation
}) => {
  const { type, min, max } = validation;
  switch (type) {
    case "email": {
      return (
        <>
          <Typography variant="body1">
            Input must be a valid <b>email</b>.
          </Typography>
          <Tooltip title="Regex: ^(\w|\.)+@\w+(\.\w+)+$">
            <Typography variant="body2" color="textSecondary">
              Must match this pattern: start with at least one word/period, '@',
              followed by at least one word, followed by a least one
              word/period, end.
            </Typography>
          </Tooltip>
        </>
      );
    }

    case "mobile": {
      return (
        <>
          <Typography variant="body1">
            Input must be a valid <b>mobile</b> number.
          </Typography>
          <Tooltip title="Regex: ^[\d+() ]+$">
            <Typography variant="body2" color="textSecondary">
              Must match this pattern: start with at least one of
              digit/brackets/spaces/+, end.
            </Typography>
          </Tooltip>
        </>
      );
    }

    case "value": {
      let info = "";
      if (min) {
        info += `Minimum of ${min} ${pluralise("character", min)}. `;
      }
      if (max) {
        info += `Maximum of ${max} ${pluralise("character", max)}. `;
      }
      if (info) {
        return (
          <>
            <Typography variant="body1">
              Input must satisfy specified length constraints.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {info}
            </Typography>
          </>
        );
      }
    }
  }

  return null;
};
