import { User } from "firebase";
import { Nullable } from "../../../../types/global";

export interface AppBarProps {
  /**
   * This function will be called when menu button is pressed.
   */
  onDrawerOpen?: () => void;
}

export interface AppBarMenuProps {
  /**
   * The user to show in the app bar menu.
   */
  user: User;

  /**
   * The anchor for the menu. If this value is not null,
   * the menu will be shown.
   */
  menuAnchor: Nullable<HTMLElement>;

  /**
   * A function that will open the menu when called.
   */
  openMenu: (...any) => any;

  /**
   * A function that will close the menu when called.
   */
  closeMenu: (...any) => any;
}
