import {
  Row,
  ColumnDefinition
} from "../../../core/components/EnhancedTable/types";
import { RaceRegistrationField } from "../../../../types/race";
import { Nullable } from "../../../../types/global";

export interface RegistrationLocal extends Row {
  [key: string]: any;
}

export interface RegistrationListProps {
  /**
   * The race to show registrations for.
   */
  raceId: string;

  /**
   * The fields in the registration form.
   * The table will use this to render the
   * columns from the registration data.
   */
  fields?: RaceRegistrationField[];
}

export interface RegistrationFilterMenuProps {
  /**
   * The anchor for the menu.
   */
  menuAnchor: Nullable<HTMLElement>;

  /**
   * Callback to close the filter menu.
   */
  closeMenu: () => void;

  /**
   * A list of column names to show in the filter menu.
   */
  columns: Array<ColumnDefinition<RegistrationLocal>>;

  /**
   * A map containing which columns should be displayed.
   */
  selectedColumns: { [key: string]: boolean };

  /**
   * A callback function used to set whether a column
   * should be displayed or not.
   */
  setSelectedColumns: (columns: { [key: string]: boolean }) => void;

  /**
   * The field that is selected to use as a filter.
   */
  filterField: Nullable<string>;

  /**
   * Callback to set the field to use as a filter.
   */
  setFilterField: (field: string) => void;

  /**
   * The value that is being used to filter the selected field.
   */
  filterValue: string;

  /**
   * Set the value being used to filter the selected field.
   */
  setFilterValue: (value: string) => void;
}

export interface RegistrationOptionsMenuProps {
  /**
   * The anchor for the menu.
   */
  menuAnchor: Nullable<HTMLElement>;

  /**
   * Callback function to close the menu.
   */
  closeMenu: () => void;

  /**
   * Callback to show the selected registration data.
   */
  setShowRawData: (shown: boolean) => void;
}
