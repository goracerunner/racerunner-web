import React, { FC, useContext } from "react";
import { firestore } from "firebase/app";

import { useFirestore } from "../../../../core/hooks/useFirebase";

import AuthenticationContext from "../../../../core/contexts/AuthenticationContext";
import DataContext from "../../../../core/contexts/DataContext";
import { DataContextState } from "../../../../core/contexts/DataContext/types";

import {
  UserPrivateClaims,
  ClaimAssignmentInput
} from "../../../../../types/users";

import { RoleSwitch } from "./RoleSwitch";
import { RoleSelectorProps } from "../types";

/**
 * This component shows the roles availble to a user and provides
 * toggles to assign/unassign the role to the selected user.
 */
export const RoleSelector: FC<RoleSelectorProps> = ({ user }) => {
  const store = useFirestore();
  const { data } = useContext<DataContextState<UserPrivateClaims>>(DataContext);
  const { user: admin } = useContext(AuthenticationContext);

  if (!data || !admin) {
    return null;
  }

  const onChangeHandler = (role: string) => () => {
    const claimsRef = store
      .collection("users")
      .doc(user.uid)
      .collection("private")
      .doc("claims");

    if (data[role]) {
      // Remove claim
      claimsRef.update({
        [role]: firestore.FieldValue.delete()
      });
    } else {
      // Add claim
      const claimAssignment: ClaimAssignmentInput = {
        date: new Date(),
        name: admin.displayName || "unknown",
        uid: admin.uid
      };
      claimsRef.update({
        [role]: claimAssignment
      });
    }
  };

  return (
    <>
      <RoleSwitch
        checked={Boolean(data["admin"])}
        label="Administrator"
        onChange={onChangeHandler("admin")}
        helperText="Grants access to the administrator dashboard."
      />
      <RoleSwitch
        checked={Boolean(data["manager"])}
        label="Race manager"
        onChange={onChangeHandler("manager")}
        helperText="Grants access to manage races."
      />
    </>
  );
};
