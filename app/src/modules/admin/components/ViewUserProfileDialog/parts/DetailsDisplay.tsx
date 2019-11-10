import React, { FC, useContext } from "react";
import moment from "moment";

import DataContext from "../../../../core/contexts/DataContext";
import { DataContextState } from "../../../../core/contexts/DataContext/types";

import { UserProtectedDetails } from "../../../../../types/users";

import Property from "../../../../core/components/Property";

/**
 * Displays the user's protected details.
 */
export const DetailsDisplay: FC = () => {
  const { data } = useContext<DataContextState<UserProtectedDetails>>(
    DataContext
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <Property title="Email">{data.email}</Property>
      <Property title="Registered">
        {moment(data.registered.toDate()).format("dddd, MMMM Do YYYY, h:mm a")}
      </Property>
    </>
  );
};
