import { User } from "firebase";

export interface AppBarProps {}

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

  /**
   * A function that will log out the current user.
   */
  logout?: () => any;
}
