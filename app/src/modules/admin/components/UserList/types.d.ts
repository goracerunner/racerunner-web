import { UserProfile } from "../../../../types/users";
import { Nullable } from "../../../../types/global";
import {
  Row,
  SortDirection
} from "../../../core/components/EnhancedTable/types";

export type UserFilters = "all" | "admin" | "manager" | "participant";

export interface UserListProps {}

export interface UserProfileLocal extends UserProfile, Row {}

export interface UserListSearchParams {
  /**
   * The page the list is on
   */
  page?: number;
  /**
   * The number of rows per page
   */
  rows?: 5 | 10 | 25 | 50;
  /**
   * The sort order
   */
  order?: keyof UserProfileLocal;
  /**
   * The sort direction
   */
  dir?: SortDirection;
}

interface UserDialogProps {
  /**
   * If this is `true`, the dialog will be shown.
   */
  open: boolean;

  /**
   * Handler to close the dialog.
   */
  onClose: () => void;

  /**
   * The user who is currently selected.
   */
  user: UserProfileLocal;
}

export interface UserOptionsMenuProps {
  /**
   * The anchor for the menu.
   */
  menuAnchor: Nullable<HTMLElement>;

  /**
   * Callback to close the menu.
   */
  closeMenu: () => void;

  /**
   * Callback to open the profile dialog.
   */
  openProfile: () => void;

  /**
   * Callback to open the roles dialog.
   */
  openRoles: () => void;

  /**
   * Callback to open the delete dialog.
   */
  openDelete: () => void;
}

export interface UsersFilterMenuProps {
  /**
   * The anchor for the menu.
   */
  menuAnchor: Nullable<HTMLElement>;

  /**
   * Callback to close the menu.
   */
  closeMenu: () => void;

  /**
   * The selected filter type.
   */
  filter: string;

  /**
   * The search value.
   */
  userSearch: string;

  /**
   * A callback function to set the search value.
   */
  setUserSearch: (search: string) => void;

  /**
   * A callback function to set the filter value.
   */
  setFilter: (filter: UserFilters) => void;
}
