import React from "react";
import TableCell from "@mui/material/TableCell";
import { useTableStyles } from "../../styles/UseStylesMui";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import axios from "axios";
import DeleteDialog from "../DialogComponents/DeleteDialog";

const useStyles = useTableStyles;
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function TableCells({ item }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.submit}>
      <TableCell className={classes.tableCell} align="left">
        <Grid container direction="row" alignItems="center">
          <Grid item>{item._id}</Grid>
        </Grid>
      </TableCell>
      <TableCell
        key={item._id + item.firstName}
        className={classes.tableCell}
        align="left"
      >
        {item.firstName}
      </TableCell>
      <TableCell
        key={item._id + item.email}
        className={classes.tableCell}
        align="left"
      >
        {item.lastName}
      </TableCell>
      <TableCell key={item.email} className={classes.tableCell} align="left">
        {item.email}
      </TableCell>
      <TableCell
        key={item.phoneNumber ? item.phoneNumber : item.firstName + item._id}
        className={classes.tableCell}
        align="left"
      >
        {item.phoneNumber}
      </TableCell>
      <TableCell
        key={item._id + item.role}
        className={classes.tableCell}
        align="left"
      >
        {item.role == "1" ? "Client" : "Manager"}
      </TableCell>
      <TableCell
        key={item._id + "-cs"}
        className={classes.tableCell}
        align="left"
      >
        <DeleteDialog
          id={item._id}
          name={item.firstName + " " + item.lastName}
          email={item.email}
          role={item.role == 1 ? "Client" : "Manager"}
        />
      </TableCell>
    </TableRow>
  );
}
