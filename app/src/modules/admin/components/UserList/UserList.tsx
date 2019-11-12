import React, { FC, useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import MoreIcon from "@material-ui/icons/MoreVert";

import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { useFirestore } from "../../../core/hooks/useFirebase";
import { useSearch, useSetSearch } from "../../../core/hooks/useSearch";

import EnhancedTable from "../../../core/components/EnhancedTable";
import { SortDirection } from "../../../core/components/EnhancedTable/types";

import ViewUserProfileDialog from "../ViewUserProfileDialog";
import EditUserRolesDialog from "../EditUserRolesDialog";

import { Maybe, Nullable } from "../../../../types/global";
import { Logger } from "../../../../utils";

import { OptionsMenu } from "./parts/OptionsMenu";
import { FilterMenu } from "./parts/FilterMenu";

import {
  UserListProps,
  UserProfileLocal,
  UserListSearchParams,
  UserFilters
} from "./types";
import useStyles from "./styles";

/**
 * This component retrieves user data from Firestore and displays
 * it in an Enhanced table which allows the user to filter and
 * sort through the list.
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

  const sortableFields: Array<keyof UserProfileLocal> = ["name"];
  const [rows, setRows] = useState<Array<UserProfileLocal>>([]);
  const [filteredRows, setFilteredRows] = useState<Array<UserProfileLocal>>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof UserProfileLocal>("name");
  const [direction, setDirection] = useState<SortDirection>("asc");

  const setRowsPerPageHandler = useCallback(
    (rows: number) => {
      setRowsPerPage(rows);
      setPage(0);
      setSearch({ rows: rows.toString(), page: "1" });
    },
    [setRowsPerPage, setSearch, setPage]
  );

  const setPageHandler = useCallback(
    (newPage: number) => {
      setPage(newPage);
      setSearch({ page: (newPage + 1).toString() });
    },
    [setPage, setSearch]
  );

  const onSortHandler = (sort: keyof UserProfileLocal) => {
    if (!sortableFields.includes(sort)) return;
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

      if (sortableFields.includes(order as keyof UserProfileLocal)) {
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
    rows,
    sortableFields
  ]);

  // Filter menu

  const [filterMenuAnchor, setFilterMenuAnchor] = useState<
    Nullable<HTMLElement>
  >(null);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };
  const closeFilterMenu = () => {
    setFilterMenuAnchor(null);
  };

  const [userSearch, setUserSearch] = useState("");
  const [filter, setFilter] = useState<UserFilters>("all");
  const setFilterHandler = (filter: UserFilters) => {
    setFilter(filter);
    closeFilterMenu();
  };

  useEffect(() => {
    if (userSearch.length === 0) {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter(
          row => row.name.toLowerCase().indexOf(userSearch.toLowerCase()) >= 0
        )
      );
    }
  }, [rows, userSearch, setFilteredRows]);

  // Get user data

  const store = useFirestore();
  useEffect(() => {
    async function getData() {
      let ref = store.collection("users").orderBy(orderBy, direction);
      if (filter !== "all") {
        ref = ref.where("roles", "array-contains", filter);
      }
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
  }, [store, direction, orderBy, filter]);

  // User menu

  const [selectedUser, setSelectedUser] = useState<Nullable<UserProfileLocal>>(
    null
  );
  const [optionsMenuAnchor, setOptionsMenuAnchor] = useState<
    Nullable<HTMLElement>
  >(null);
  const openOptionsMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: UserProfileLocal
  ) => {
    setOptionsMenuAnchor(event.currentTarget);
    setSelectedUser(user);
  };
  const closeOptionsMenu = () => {
    setOptionsMenuAnchor(null);
  };

  // User menu dialogs
  const [showProfile, openProfile, closeProfile] = useBooleanState(false);
  const [showRoles, openRoles, closeRoles] = useBooleanState(false);
  const [showDelete, openDelete, closeDelete] = useBooleanState(false);
  const { enqueueSnackbar } = useSnackbar();

  // FIXME: implement delete dialog
  useEffect(() => {
    if (showDelete) {
      Logger.warn("UserList", "Deleting a user is not implemented.");
      closeDelete();
      enqueueSnackbar("Deleting a user is not available yet.", {
        variant: "error"
      });
    }
  }, [showDelete, closeDelete, enqueueSnackbar]);

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
        rows={filteredRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
        totalRows={rows.length}
        loading={loading}
        onSort={onSortHandler}
        sortableFields={sortableFields}
        orderBy={orderBy}
        direction={direction}
        onOpenFilters={openFilterMenu}
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
                  openOptionsMenu(event, data);
                }}
              >
                <MoreIcon />
              </IconButton>
            )
          }
        ]}
      />
      <OptionsMenu
        menuAnchor={optionsMenuAnchor}
        closeMenu={closeOptionsMenu}
        openProfile={openProfile}
        openRoles={openRoles}
        openDelete={openDelete}
      />
      <FilterMenu
        menuAnchor={filterMenuAnchor}
        closeMenu={closeFilterMenu}
        filter={filter}
        userSearch={userSearch}
        setFilter={setFilterHandler}
        setUserSearch={setUserSearch}
      />
      {selectedUser && (
        <ViewUserProfileDialog
          open={showProfile}
          onClose={closeProfile}
          user={selectedUser}
        />
      )}
      {selectedUser && (
        <EditUserRolesDialog
          open={showRoles}
          onClose={closeRoles}
          user={selectedUser}
        />
      )}
    </div>
  );
};
