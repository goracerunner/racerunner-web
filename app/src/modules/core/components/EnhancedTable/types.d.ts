import { Maybe, Nullable } from "../../../../types/global";

export type SortDirection = "asc" | "desc";

/**
 * Represents a piece of data that will be displayed in the table.
 * This should be extended to include the fields of a piece of
 * data that will be displayed in the table.
 */
export interface Row {
  /**
   * A unique id for this piece of data.
   */
  id: string;
}

/**
 * Represents a column that will be shown in the table. The column
 * should correspond to a specific field in a data `Row` object.
 */
export interface ColumnDefinition<T extends Row = Row> {
  /**
   * The corresponding key in the `Row` object.
   */
  id: keyof T;

  /**
   * The human-friendly name for this column.
   */
  label: string;

  /**
   * Tooltip to show for the column. This is shown when the user
   * mouses over the column name.
   */
  tooltip?: string;

  /**
   * If this is `true`, the column will be hidden.
   */
  hidden?: boolean;

  /**
   * If this column shows numeric data, it will be aligned to the right.
   */
  numeric?: boolean;

  /**
   * If `true`, default padding will be set to 0 in the cell.
   */
  disablePadding?: boolean;

  /**
   * A function that takes in the value of the the current row and
   * transforms it to something that can be rendered in the cell.
   */
  transform?: (value: T) => JSX.Element;
}

export interface EnhancedTableProps<T extends Row = Row>
  extends EnhancedTableToolbarProps<T>,
    EnhancedTableHeadProps<T> {
  /**
   * If this is `true`, the spacing between content in the table will be dense.
   */
  dense?: boolean;

  /**
   * The number of rows per page to show. This should be one of the options
   * in the `rowsPerPageOptions` prop.
   * @default 10
   */
  rowsPerPage?: number;

  /**
   * Configure the options shown for the rows per page options.
   * @default [5,10,25]
   */
  rowsPerPageOptions?: number[];

  /**
   * The current page that the table is showing.
   * @default 1
   */
  page?: number;

  /**
   * A function that can be used to set which rows are selected.
   */
  setSelected?: (selected: { [key: string]: Maybe<T> }) => void;

  /**
   * Handler for when the user changes the page.
   */
  onChangePage?: (newPage: number) => void;

  /**
   * Handler for when the user changes the rows per page.
   */
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
}

export interface EnhancedTableToolbarProps<T extends Row> {
  /**
   * The title to show on the toolbar.
   */
  title?: string;

  /**
   * The number of rows selected.
   */
  numSelected?: number;

  /**
   * Callback for when the user opens the filter menu.
   */
  onOpenFilters?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Provide a row of action buttons that will be shown when rows of data are selected.
   */
  actionMenu?: Nullable<JSX.Element | Array<JSX.Element>>;
}

export interface EnhancedTableHeadProps<T extends Row> {
  /**
   * If `true`, a column for a checkbox will be displayed
   * to allow the ability to select all.
   */
  checkbox?: boolean;

  /**
   * Indexes of rows that are selected.
   */
  selected?: { [key: string]: Maybe<T> };

  /**
   * The rows to show in the table.
   */
  rows?: Array<T>;

  /**
   * The total number of rows in the table. By default, this uses `rows.length`,
   * but this allows this value to be overridden.
   */
  totalRows?: number;

  /**
   * A function that can be used to set which rows are selected.
   */
  setSelected?: (selected: T[]) => void;

  /**
   * The number of rows selected.
   */
  numSelected?: number;

  /**
   * List of columns to show.
   */
  columns?: Array<ColumnDefinition<T>>;

  /**
   * The column that the table is currently sorted by.
   */
  orderBy?: keyof T;

  /**
   * The direction in which the table is sorted by.
   */
  direction?: SortDirection;

  /**
   * Show that the table data is loading.
   */
  loading?: boolean;

  /**
   * Callback for handling when a column sort is requested.
   */
  onSort?: (column: typeof T) => void;

  /**
   * Specify the fields that can be sorted.
   */
  sortableFields?: Array<keyof T>;
}
