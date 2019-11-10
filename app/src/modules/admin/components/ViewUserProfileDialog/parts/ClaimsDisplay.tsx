import React, { FC, useContext } from "react";
import moment from "moment";

import Typography from "@material-ui/core/Typography";

import DataContext from "../../../../core/contexts/DataContext";
import { DataContextState } from "../../../../core/contexts/DataContext/types";

import Property from "../../../../core/components/Property";

import { UserPrivateClaims } from "../../../../../types/users";

import { useDisplayStyles } from "../styles";

/**
 * Displays the user's private claims.
 */
export const ClaimsDisplay: FC = () => {
  const classes = useDisplayStyles();
  const { data } = useContext<DataContextState<UserPrivateClaims>>(DataContext);

  if (!data) {
    return null;
  }

  return (
    <Property title="Claims">
      {
        <ul className={classes.claims}>
          {Object.keys(data)
            .filter(k => k !== "uid")
            .map((key, index) => {
              const claim = data[key];
              return (
                <li key={`claim-${index}`}>
                  <Typography component="span" variant="body1">
                    {key}
                  </Typography>
                  {claim.name && claim.date && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {" "}
                      (added by {claim.name}{" "}
                      {moment(claim.date.toDate()).fromNow()})
                    </Typography>
                  )}
                </li>
              );
            })}
        </ul>
      }
    </Property>
  );
};
