import React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

import Skeleton, { SkeletonLine, SkeletonAvatar } from "../Skeleton";

import { EnhancedTableToolbar } from "./parts/EnhancedTableToolbar";
import { EnhancedTableHead } from "./parts/EnhancedTableHead";

import { EnhancedTableProps, Row } from "./types";
import useStyles from "./styles";

/**
 * The `EnhancedTable` component is a versatile table that allows
 * customisation of how a list of data is displayed. Provide data
 * to be rendered through the `rows` prop. Determine which values
 * of the data to be displayed through the `columns` prop. Transform
 * how the data is displayed by defining how each column should
 * be rendered. Pagination is built in and callbacks can be used
 * to refetch data if it needs to be done asynchronously.
 */
export function EnhancedTable<T extends Row>(props: EnhancedTableProps<T>) {
  const classes = useStyles(props);
  const {
    title,
    dense = false,
    checkbox = false,
    selected = {},
    setSelected = () => {},
    rowsPerPageOptions = [5, 10, 25],
    rowsPerPage = 10,
    page = 0,
    rows = [],
    totalRows = rows.length,
    columns = [],
    onChangePage = () => {},
    onChangeRowsPerPage = () => {},
    onOpenFilters,
    loading,
    onSort,
    sortableFields,
    orderBy,
    direction
  } = props;

  const handleChangePage = (event: unknown, newPage: number) =>
    onChangePage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeRowsPerPage(parseInt(event.target.value, 10));
    // onChangePage(0);
  };

  const numSelected = Object.keys(selected).reduce(
    (count, key) => count + (selected[key] ? 1 : 0),
    0
  );

  const handleSetSelected = (data: T[]) => {
    setSelected(
      data.reduce(
        (acc, d) => ({
          ...acc,
          [d.id]: selected[d.id] ? undefined : d
        }),
        selected
      )
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar<T>
          title={title}
          numSelected={numSelected}
          onOpenFilters={onOpenFilters}
        />
        <div className={classes.tableWrapper}>
          {loading && (
            <div className={classes.loading}>
              <CircularProgress className={classes.loader} size="3rem" />
            </div>
          )}
          <Table className={classes.table} size={dense ? "small" : "medium"}>
            <EnhancedTableHead<T>
              loading={loading}
              checkbox={checkbox}
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              selected={selected}
              setSelected={handleSetSelected}
              numSelected={numSelected}
              onSort={onSort}
              sortableFields={sortableFields}
              orderBy={orderBy}
              direction={direction}
            />
            <TableBody>
              {loading
                ? Array.from(Array(rowsPerPage).keys()).map((_, rowIndex) => (
                    <TableRow tabIndex={-1} key={rowIndex}>
                      {checkbox && (
                        <TableCell padding="checkbox">
                          <Checkbox disabled color="primary" />
                        </TableCell>
                      )}
                      {columns
                        .filter(column => !column.hidden)
                        .map((_, colIndex) => (
                          <TableCell key={`${colIndex}-${rowIndex}`}>
                            <Skeleton>
                              {colIndex === 0 && <SkeletonAvatar />}
                              <SkeletonLine />
                            </Skeleton>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
                : rows.slice(0, rowsPerPage).map((row, rowIndex) => {
                    const isSelected = Boolean(selected[row.id]);
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        {checkbox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              disabled={loading}
                              color="primary"
                              checked={isSelected}
                              onClick={() => handleSetSelected([row])}
                            />
                          </TableCell>
                        )}
                        {columns
                          .filter(column => !column.hidden)
                          .map((column, colIndex) => {
                            if (column.transform) {
                              return (
                                <TableCell
                                  key={`${colIndex}-${rowIndex}`}
                                  padding={
                                    column.disablePadding ? "none" : "default"
                                  }
                                >
                                  {column.transform(row)}
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={`${colIndex}-${rowIndex}`}>
                                {row[column.id]}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          count={totalRows}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
