import React from "react";
import clsx from "clsx";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import FilterListIcon from "@material-ui/icons/FilterList";

import { useToolbarStyles } from "../styles";
import { Row, EnhancedTableToolbarProps } from "../types";

/**
 * This component renders the toolbar at the top of an Enhanced table.
 * It allows customisation of actions to take for the whole table,
 * such as filtering, or taking actions on selected rows.
 */
export function EnhancedTableToolbar<T extends Row>(
  props: EnhancedTableToolbarProps<T>
) {
  const classes = useToolbarStyles();
  const { title, numSelected = 0, onOpenFilters, actionMenu = null } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography color="textPrimary" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6">{title}</Typography>
      )}
      <div>
        {numSelected > 0
          ? actionMenu
          : onOpenFilters && (
              <Tooltip title="Filter list">
                <IconButton onClick={onOpenFilters}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
      </div>
    </Toolbar>
  );
}
