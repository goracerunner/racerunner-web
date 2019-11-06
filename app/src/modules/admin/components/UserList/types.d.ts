import { UserProfile } from "../../../../types/users";
import {
  Row,
  SortDirection
} from "../../../core/components/EnhancedTable/types";

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
