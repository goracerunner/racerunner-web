import React, { FC } from "react";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import CancelIcon from "@material-ui/icons/Close";

import { text } from "../../../../../utils";

import { RegistrationFilterMenuProps } from "../types";
import { useMenuStyles } from "../styles";

const ALWAYS_SHOWN = ["date", "name", "id"];
const UNFILTERABLE = ["id", "date"];

/**
 * This component renders the filtering options for a registration table.
 */
export const FilterMenu: FC<RegistrationFilterMenuProps> = ({
  filterMenuAnchor,
  closeFilterMenu,
  columns,
  selectedColumns,
  setSelectedColumns,
  filterField,
  filterValue,
  setFilterField,
  setFilterValue
}) => {
  const classes = useMenuStyles();

  const setColumn = (column: string, selected: boolean) => {
    setSelectedColumns({ ...selectedColumns, [column]: selected });
  };

  return (
    <Menu
      keepMounted
      anchorEl={filterMenuAnchor}
      open={Boolean(filterMenuAnchor)}
      onClose={closeFilterMenu}
      transformOrigin={{
        horizontal: "right",
        vertical: "top"
      }}
    >
      <ListItem>
        <Typography variant="button" color="textSecondary">
          Filtering
        </Typography>
      </ListItem>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel>Filter by field</InputLabel>
          <Select
            fullWidth
            value={filterField || ""}
            onChange={e => setFilterField(e.target.value as string)}
          >
            {columns
              .map(col => col.id as string)
              .filter(id => !UNFILTERABLE.includes(id))
              .map(id => (
                <MenuItem key={id} value={id}>
                  {text.capitalise(id)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        <TextField
          disabled={!Boolean(filterField)}
          onChange={e => setFilterValue(e.target.value)}
          label={filterField ? `Filter by ${filterField}` : `No field selected`}
          placeholder="Type a value..."
          value={filterValue}
        />
        {filterValue && (
          <IconButton
            size="small"
            className={classes.cancel}
            onClick={() => setFilterValue("")}
          >
            <CancelIcon />
          </IconButton>
        )}
      </ListItem>
      <Divider />
      <div>
        <ListItem>
          <Typography variant="button" color="textSecondary">
            Shown fields
          </Typography>
        </ListItem>
        {columns
          .map(col => col.id as string)
          .filter(id => !ALWAYS_SHOWN.includes(id))
          .map(id => (
            <MenuItem
              key={id}
              onClick={() => setColumn(id, !selectedColumns[id])}
            >
              <Typography
                className={clsx({
                  [classes.selected]: selectedColumns[id]
                })}
              >
                {selectedColumns[id] ? "Hide" : "Show"} {id}
              </Typography>
            </MenuItem>
          ))}
      </div>
    </Menu>
  );
};
