import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

import { Row, EnhancedTableHeadProps } from "../types";

/**
 * This component renders the Enhanced table's header.
 * The header shows the column names, provides the ability
 * to select/deselect all rows and callbacks to trigger
 * sorting by column.
 */
export function EnhancedTableHead<T extends Row = Row>(
  props: EnhancedTableHeadProps<T>
) {
  const {
    checkbox,
    columns = [],
    orderBy,
    direction = "asc",
    setSelected = () => {},
    selected = {},
    rows = [],
    totalRows = rows.length,
    loading,
    onSort = () => {},
    sortableFields = []
  } = props;

  const selectedCount = Object.keys(selected).reduce(
    (count, key) => count + (selected[key] ? 1 : 0),
    0
  );

  const selectAllHandler = () => {
    if (selectedCount > totalRows / 2) {
      // Deselect all
      setSelected(
        Object.keys(selected)
          .map(key => selected[key]!)
          .filter(value => Boolean(value))
      );
    } else {
      if (selectedCount === rows.length) {
        // Delsect page
        setSelected(rows.filter(row => selected[row.id]));
      } else {
        // Select all
        setSelected(rows.filter(row => !selected[row.id]));
      }
    }
  };

  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding="checkbox">
            <Tooltip
              title={
                selectedCount > totalRows / 2
                  ? "Deslect all"
                  : selectedCount === rows.length
                  ? "Deselect all on this page"
                  : "Select all on this page"
              }
            >
              <Checkbox
                disabled={loading}
                color="primary"
                onClick={selectAllHandler}
                indeterminate={
                  selectedCount !== 0 && selectedCount !== totalRows
                }
                checked={totalRows === selectedCount}
              />
            </Tooltip>
          </TableCell>
        )}
        {columns.map((column, index) => {
          const canSort = sortableFields.includes(column.id);
          return (
            <TableCell key={index} align={column.numeric ? "right" : "left"}>
              <Tooltip title={column.tooltip || ""} placement="top-start">
                <div>
                  <TableSortLabel
                    disabled={loading || !canSort}
                    active={canSort && orderBy === column.id}
                    direction={direction}
                    onClick={() => onSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </div>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
