import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import MoreIcon from "@material-ui/icons/MoreVert";

import { Maybe } from "../../../../types/global";

import EnhancedTable from "../../../core/components/EnhancedTable";

import useStyles from "./styles";

interface Data {
  id: string;
  name: string;
  email: string;
}

const rows = [
  {
    id: "1",
    name: "Ben Yap",
    email: "benjaminyapau@gmail.com"
  },
  {
    id: "2",
    name: "Benjamin Yap",
    email: "bwyap@outlook.com"
  },
  {
    id: "4",
    name: "Susan Sadanwitz",
    email: "susan_qtkbtuk_sadanwitz@tfbnw.net"
  },
  {
    id: "5",
    name: "Margaret Moiduescu",
    email: "margaret_zkxbgrd_moiduescu@tfbnw.net"
  },
  {
    id: "98",
    name: "Tom Lisky",
    email: "tom_tyxarns_lisky@tfbnw.net"
  },
  {
    id: "534",
    name: "Joe Warmanman",
    email: "Joe.Warmanman@tfbnw.net"
  },
  {
    id: "49",
    name: "Mark Okelolasky",
    email: "Mark.Okelolasky@tfbnw.net"
  },
  {
    id: "51",
    name: "Mike Warmansen",
    email: "Mike.Warmansen@tfbnw.net"
  },
  {
    id: "97",
    name: "Patricia Greenesky",
    email: "Patricia.Greenesky@tfbnw.net"
  }
];

/**
 * TODO: add description
 */
export const AdminUsersPage: React.FC = () => {
  const classes = useStyles();

  const [selected, setSelected] = useState<{ [key: string]: Maybe<Data> }>({});
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  const handleSetSelected = (data: Data[]) => {
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
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.title}>
        <b>Users</b>
      </Typography>
      <EnhancedTable<Data>
        checkbox
        title="Users"
        selected={selected}
        setSelected={handleSetSelected}
        rowsPerPageOptions={[1, 3, 5, 8]}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={setRowsPerPage}
        page={page}
        onChangePage={setPage}
        rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        totalRows={rows.length}
        columns={[
          {
            id: "name",
            label: "Name",
            transform: (data: Data) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Avatar
                  style={{
                    marginRight: "0.5rem",
                    width: "2rem",
                    height: "2rem"
                  }}
                >
                  {data.name[0]}
                </Avatar>
                <Typography>{data.name}</Typography>
              </div>
            )
          },
          {
            id: "email",
            label: "Email"
          },
          {
            id: "id",
            label: "",
            disablePadding: true,
            transform: () => (
              <IconButton style={{}}>
                <MoreIcon />
              </IconButton>
            )
          }
        ]}
      />
    </Container>
  );
};
