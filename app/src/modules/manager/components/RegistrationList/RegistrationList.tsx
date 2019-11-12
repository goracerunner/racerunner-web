import React, { FC, useState, useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "firebase/app";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import MoreIcon from "@material-ui/icons/MoreVert";
import TrueIcon from "@material-ui/icons/CheckCircle";
import FalseIcon from "@material-ui/icons/Clear";

import { useSetSearch } from "../../../core/hooks/useSearch";
import { useFirestore } from "../../../core/hooks/useFirebase";

import EnhancedTable from "../../../core/components/EnhancedTable";
import { ColumnDefinition } from "../../../core/components/EnhancedTable/types";
import ViewRawRegistrationDialog from "../ViewRawRegistrationDialog";

import { Logger, text } from "../../../../utils";

import { FilterMenu } from "./parts/FilterMenu";
import { OptionsMenu } from "./parts/OptionsMenu";

import { Nullable } from "../../../../types/global";
import { RaceRegistrationField } from "../../../../types/race";

import { RegistrationListProps, RegistrationLocal } from "./types";
import useStyles from "./styles";

const SHOWN_FIELD_TYPES = [
  "number",
  "text",
  "longtext",
  "list",
  "listcustom",
  "select",
  "checkbox"
];

/**
 * This component retrieves registration data from Firestore
 * and displays it in an Enhanced table which allows the user
 * to filter the list.
 */
export const RegistrationList: FC<RegistrationListProps> = ({ raceId }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // Table state
  const setSearch = useSetSearch();

  const rowsPerPageOptions = [5, 10, 25, 50];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [columns, setColumns] = useState<
    Array<ColumnDefinition<RegistrationLocal>>
  >([{ id: "id", label: "" }]);
  const [selectedColumns, setSelectedColumns] = useState<{
    [key: string]: boolean;
  }>({});
  const [rows, setRows] = useState<Array<RegistrationLocal>>([]);
  const [filteredRows, setFilteredRows] = useState<Array<RegistrationLocal>>(
    []
  );

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

  // Get user data

  const store = useFirestore();
  useEffect(() => {
    async function getData() {
      let ref = store
        .collection("races")
        .doc(raceId)
        .collection("registrations")
        .orderBy("date", "asc");
      try {
        const registrations = (await ref.get()).docs.map(
          doc => doc.data() as RegistrationLocal
        );
        setRows(registrations);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Failed to retrieve registrations", {
          variant: "error"
        });
        Logger.error("UserList", "Failed to retrieve registrations", error);
      }
    }
    getData();
  }, [store, enqueueSnackbar, raceId]);

  // Get registration fields data

  const [fields, fieldsLoading, fieldsError] = useCollectionData<
    RaceRegistrationField
  >(
    store
      .collection("races")
      .doc(raceId)
      .collection("registrationFields")
      .orderBy("order")
  );

  useEffect(() => {
    if (fieldsError) {
      enqueueSnackbar("Failed to retrieve registration fields.", {
        variant: "error"
      });
      Logger.error(
        "RegistrationList",
        "Failed to retrieve registration fields",
        fieldsError
      );
    }
  }, [fieldsError, enqueueSnackbar]);

  useEffect(() => {
    // Set the default columns once we get the fields.
    if (fields && fields.length && columns.length <= 1) {
      const columns: Array<ColumnDefinition<RegistrationLocal>> = [
        {
          id: "date",
          label: "Date",
          tooltip: "Registration submission date",
          transform: (data: RegistrationLocal) => {
            const date = moment((data.date as firestore.Timestamp).toDate());
            return (
              <Tooltip title={date.fromNow()}>
                <Typography
                  variant="body2"
                  component="div"
                  className={classes.date}
                >
                  {date.format("D MMM YYYY hh:mm a")}
                </Typography>
              </Tooltip>
            );
          }
        }
      ];
      fields
        .filter(field => SHOWN_FIELD_TYPES.includes(field.type))
        .map(field => {
          const column: ColumnDefinition<RegistrationLocal> = {
            id: field.name,
            label: text.capitalise(field.name),
            tooltip: field.label,
            numeric: field.type === "number",
            transform: (data: RegistrationLocal) => {
              const value = data[field.name];
              if (field.type === "checkbox" && typeof value === "boolean") {
                if (value === true) {
                  return <TrueIcon className={classes.trueIcon} />;
                } else if (value === false) {
                  return <FalseIcon color="error" />;
                }
              }
              return (
                <Typography
                  variant="body2"
                  color={value ? "inherit" : "textSecondary"}
                >
                  {value ? value.toString() : "null"}
                </Typography>
              );
            }
          };
          return column;
        })
        .forEach(column => columns.push(column));
      // Add options menu column
      columns.push({
        id: "id",
        label: "",
        disablePadding: true,
        transform: (data: RegistrationLocal) => (
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              openMenu(event, data);
            }}
          >
            <MoreIcon />
          </IconButton>
        )
      });
      setColumns(columns);
      setSelectedColumns(
        columns.reduce((map, col) => ({ ...map, [col.id]: true }), {})
      );
    }
  }, [
    fields,
    setColumns,
    columns,
    selectedColumns,
    classes.date,
    classes.trueIcon
  ]);

  // Registration menu

  const [selectedRego, setSelectedRego] = useState<Nullable<RegistrationLocal>>(
    null
  );
  const [optionsMenuAnchor, setOptionsMenuAnchor] = useState<
    Nullable<HTMLElement>
  >(null);
  const openMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    rego: RegistrationLocal
  ) => {
    setOptionsMenuAnchor(event.currentTarget);
    setSelectedRego(rego);
  };
  const closeOptionsMenu = () => {
    setOptionsMenuAnchor(null);
  };

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

  const [filterField, setFilterField] = useState<Nullable<string>>(null);
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    if (filterField && filterValue && fields) {
      const selectedField = fields.find(f => f.name === filterField);
      if (selectedField) {
        setFilteredRows(
          rows.filter(
            row =>
              row[filterField] &&
              (row[filterField].toString() as string)
                .toLowerCase()
                .indexOf(filterValue) >= 0
          )
        );
      }
    } else {
      setFilteredRows(rows);
    }
  }, [rows, setFilteredRows, filterField, filterValue, fields]);

  // Options menu

  const [showRawData, setShowRawData] = useState(false);

  return (
    <div className={classes.root}>
      <EnhancedTable<RegistrationLocal>
        title="Registrations"
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
        loading={loading || fieldsLoading}
        columns={columns.filter(c => selectedColumns[c.id])}
        onOpenFilters={openFilterMenu}
      />
      <FilterMenu
        menuAnchor={filterMenuAnchor}
        closeMenu={closeFilterMenu}
        columns={columns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        filterField={filterField}
        setFilterField={setFilterField}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      {selectedRego && (
        <OptionsMenu
          closeMenu={closeOptionsMenu}
          menuAnchor={optionsMenuAnchor}
          setShowRawData={setShowRawData}
        />
      )}
      {selectedRego && (
        <ViewRawRegistrationDialog
          open={showRawData}
          onClose={() => setShowRawData(false)}
          registration={selectedRego}
        />
      )}
    </div>
  );
};
