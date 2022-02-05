import React from "react";
import TableCell from "@mui/material/TableCell";
import { useTableStyles } from "./TableConstants";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";
import axios from "axios";

const useStyles = useTableStyles;
const api = axios.create({ baseURL: "http://localhost:8080" });

export default function NeutropeniaCells({ item }) {
  const classes = useStyles();

  const deleteUser = () => {
    api
      .delete(`/delete/${item._id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <TableRow className={classes.submit} key={item.subject}>
      <TableCell className={classes.tableCell} align="left">
        <Grid container direction="row" alignItems="center">
          <Grid item>{item._id}</Grid>
        </Grid>
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {item.firstName}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {item.lastName}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {item.email}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        {item.role == "1" ? "Client" : "Manager"}
      </TableCell>
      <TableCell className={classes.tableCell} align="left">
        <Button
          onClick={deleteUser}
          style={{ background: "none", border: "none" }}
        >
          <DeleteIcon color="error" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
