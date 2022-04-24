import React from "react";
import TableCell from "@mui/material/TableCell";
import { useTableStyles } from "../../styles/UseStylesMui";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import DeleteDialog from "../DialogComponents/DeleteDialog";
import {Link} from "react-router-dom";
import { Button } from "@mui/material";

const useStyles = useTableStyles;
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function TableCells({ item }) {
  const classes = useStyles();

  return (
    <TableRow className={classes.submit}>
      <TableCell className={classes.tableCell} align="left">
        <Link to={`/profile/${item._id}`} className="cancel-underline ml-10">
          <Button className="capital-letter bg-col-blue" variant="contained">
            User Profile
          </Button>
        </Link>
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
        {item.role == 1 ? "Client" : item.role == 2 ? "Dealer" : "Manager"}
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
          role={item.role == 1 ? "Client" : item.role == 2 ? "Dealer" : "Manager"}
          disabled={item.role == 3 ? true : false}
        />
      </TableCell>
    </TableRow>
  );
}
