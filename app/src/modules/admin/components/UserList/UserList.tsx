import React, { FC, useState, useEffect, useCallback } from "react";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import MoreIcon from "@material-ui/icons/MoreVert";

import { useFirestore } from "../../../core/hooks/useFirebase";
import { useSearch, useSetSearch } from "../../../core/hooks/useSearch";

import EnhancedTable from "../../../core/components/EnhancedTable";
import { SortDirection } from "../../../core/components/EnhancedTable/types";

import { Maybe, Nullable } from "../../../../types/global";
import { Logger } from "../../../../utils";

import { UserListProps, UserProfileLocal, UserListSearchParams } from "./types";
import useStyles from "./styles";

/**
 * This component retrieves user data from Firestore and displays it in
 * an Enhanced table which allows the user to sort through the list.
 */
export const UserList: FC<UserListProps> = () => {
  const classes = useStyles();

  // Table state
  const setSearch = useSetSearch();
  const [selected, setSelected] = useState<{
    [key: string]: Maybe<UserProfileLocal>;
  }>({});
  const rowsPerPageOptions = [5, 10, 25, 50];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [rows, setRows] = useState<Array<UserProfileLocal>>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof UserProfileLocal>("name");
  const [direction, setDirection] = useState<SortDirection>("asc");

  const setRowsPerPageHandler = useCallback(
    (rows: number) => {
      setRowsPerPage(rows);
      setSearch({ rows: rows.toString() });
    },
    [setRowsPerPage, setSearch]
  );

  const setPageHandler = useCallback(
    (newPage: number) => {
      setPage(newPage);
      setSearch({ page: (newPage + 1).toString() });
    },
    [setPage, setSearch]
  );

  const onSortHandler = (sort: keyof UserProfileLocal) => {
    if (sort === orderBy) {
      const dir = direction === "asc" ? "desc" : "asc";
      setDirection(dir);
      setSearch({ dir, order: sort });
    } else {
      setOrderBy(sort);
      setSearch({ dir: direction, order: sort });
    }
  };

  // Load table state from query string

  const searchParams = useSearch<UserListSearchParams>({ parseNumbers: true });
  const [queryLoaded, setQueryLoaded] = useState(false);
  useEffect(() => {
    // Only load query params once after data has been loaded
    if (!queryLoaded && rows.length > 0) {
      setQueryLoaded(true);

      // Extract parameters
      const { page, rows: rowsParam, dir, order } = searchParams;

      // Only set valid parameters

      let rowsToUse = rowsPerPage;

      if (rowsParam && rowsPerPageOptions.includes(rowsParam)) {
        setRowsPerPageHandler(rowsParam);
        rowsToUse = rowsParam;
      }

      if (page && page > 0 && page <= rows.length / rowsToUse)
        setPageHandler(page - 1);

      if (dir === "asc" || dir === "desc") {
        setDirection(dir);
      }

      if (["uid", "name", "photoURL", "id"].includes(order as any)) {
        setOrderBy(order!);
      }
    }
  }, [
    queryLoaded,
    setQueryLoaded,
    searchParams,
    setPageHandler,
    rowsPerPage,
    rowsPerPageOptions,
    setRowsPerPageHandler,
    setDirection,
    setOrderBy,
    rows
  ]);

  // Get user data

  const store = useFirestore();
  useEffect(() => {
    async function getData() {
      let ref = store.collection("users").orderBy(orderBy, direction);
      try {
        const users = (await ref.get()).docs.map(
          doc => doc.data() as UserProfileLocal
        );
        const rows = users.map(user => ({
          ...user,
          id: user.uid
        }));
        setRows(rows);
        setLoading(false);
      } catch (error) {
        Logger.error("UserList", "Failed to retrieve users", error);
      }
    }
    getData();
  }, [store, orderBy, direction, setRows, setLoading, setPageHandler, page]);

  // User menu

  const [selectedUser, setSelectedUser] = useState<Nullable<UserProfileLocal>>(
    null
  );
  const [menuAnchor, setMenuAnchor] = useState<Nullable<HTMLElement>>(null);
  const openMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: UserProfileLocal
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };
  const closeMenu = () => {
    setMenuAnchor(null);
  };

  // Return the table

  return (
    <div className={classes.root}>
      <EnhancedTable<UserProfileLocal>
        checkbox
        title="Users"
        selected={selected}
        setSelected={setSelected}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={setRowsPerPageHandler}
        page={page}
        onChangePage={setPageHandler}
        rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        totalRows={rows.length}
        loading={loading}
        onSort={onSortHandler}
        orderBy={orderBy}
        direction={direction}
        columns={[
          {
            id: "name",
            label: "Name",
            transform: (data: UserProfileLocal) => (
              <div className={classes.nameLabel}>
                <Avatar className={classes.avatar} src={data.photoURL} />
                <Typography variant="body2">{data.name}</Typography>
              </div>
            )
          },
          {
            id: "uid",
            label: "UID"
          },
          {
            id: "id",
            label: "",
            disablePadding: true,
            transform: (data: UserProfileLocal) => (
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  openMenu(event, data);
                }}
              >
                <MoreIcon />
              </IconButton>
            )
          }
        ]}
      />
      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        {selectedUser && (
          <div>
            {/* TODO: implmement menu */}
            <MenuItem>View profile</MenuItem>
            <Divider />
            <MenuItem>Manager status</MenuItem>
            <MenuItem>Admin status</MenuItem>
            <Divider />
            <MenuItem>Delete user</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};
