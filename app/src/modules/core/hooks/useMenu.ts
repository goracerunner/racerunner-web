import React, { useState } from "react";

import { Nullable } from "../../../types/global";

import { UseMenuAnchorHookResult } from "./types";

/**
 * This hook creates the state and callbacks required to
 * save a HTMLElement anchor for a menu.
 * @param openCallback callback to be called when the open menu function is executed
 * @param closeCallback callback to be called when the close menu function is exectued
 */
export const useMenuAnchor: (
  openCallback?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  closeCallback?: () => void
) => UseMenuAnchorHookResult = (
  openCallback = () => {},
  closeCallback = () => {}
) => {
  const [menuAnchor, setMenuAnchor] = useState<Nullable<HTMLElement>>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    openCallback(event);
    setMenuAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    closeCallback();
    setMenuAnchor(null);
  };
  return [menuAnchor, openMenu, closeMenu];
};
