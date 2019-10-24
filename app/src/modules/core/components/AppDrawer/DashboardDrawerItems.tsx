import React, { FC } from "react";

import List from "@material-ui/core/List";

import { AppDrawerItemsProps } from "./types";

/**
 * Shows the items for the dashboard mode drawer.
 */
export const DashboardDrawerItems: FC<AppDrawerItemsProps> = ({ onClose }) => {
  return <List></List>;
};
