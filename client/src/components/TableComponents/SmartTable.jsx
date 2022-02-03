import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
  useTableStyles,
  descendingComparator,
  getComparator,
  stableSort,
} from "./TableConstants";

import ScrollToTop from "./ScrollToTop";

const StyledTableCell = withStyles((theme) => ({
  root: {
    lineHeight: "1.21rem",
    top: -1,
  },

  head: {
    // backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    paddingTop: "10px",
    fontSize: "0.812rem",
    fontWeight: 700,
    height: "50px",
    borderColor: "#CDCDCD",
  },
  body: {
    color: "rgba(0, 0, 0, 0.76)",
  },
}))(TableCell);

const useStyles = useTableStyles;

export default function SmartTable({
  data,
  headCells,
  columns,
  cells,
  topNum,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("PatietID");
  const classes = useStyles();

  let dataCount = 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  const handleSortRequest = (event, property) => {
    const isAsc = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAsc ? "desc" : "asc");
  };

  const cancelBorderBottom = {
    borderBottom: "none",
    paddingBottom: "0px !important",
  };
  return (
    <>
      <ScrollToTop showBelow={250} />

      <Paper className={classes.paper}>
        <TableContainer className={classes.tableWrapper}>
          <Table
            className={classes.table}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow style={{ height: "1.21rem" }}>
                {headCells.map((headCell) => (
                  <StyledTableCell
                    key={`${headCell.id}-c`}
                    align={"left"}
                    sx={columns ? cancelBorderBottom : {}}
                    colSpan={headCell.span}
                    className={classes.callAfter}
                    style={headCell.style}
                  >
                    <div
                      className={
                        headCell.id !== "lastSeen"
                          ? classes.divWrapperOfHeader
                          : classes.divWrapperOfHeaderAction
                      }
                    >
                      {headCell.id === "lastSeen" ||
                      headCell.id === "Alerts" ||
                      headCell.id === "Status" ? (
                        <div
                          className={classes.sortLabel}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "rgba(0, 0, 0, 0.87)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {headCell.label}
                        </div>
                      ) : (
                        <TableSortLabel
                          className={
                            headCell.hasborder
                              ? classes.sortLabel
                              : classes.sortLabelNoBorderAfter
                          }
                          active={
                            headCell.id === "lastSeen" ||
                            headCell.id === "Alerts"
                              ? false
                              : true
                          }
                          hideSortIcon={
                            headCell.id === "lastSeen" ||
                            headCell.id === "Alerts"
                              ? false
                              : false
                          }
                          align={"left"}
                          active={valueToOrderBy === headCell.id}
                          direction={
                            valueToOrderBy == headCell.id
                              ? orderDirection
                              : "asc"
                          }
                          onClick={createSortHandler(headCell.id)}
                        >
                          <span
                            className={classes.span}
                            style={{
                              color: "rgba(0, 0, 0, 0.87)",
                              fontSize: "0.875rem",
                            }}
                          >
                            {headCell.label}
                            {headCell.SubTitle}
                          </span>
                        </TableSortLabel>
                      )}
                    </div>
                  </StyledTableCell>
                ))}
              </TableRow>

              {columns ? (
                <TableRow style={{ display: "contents", height: "0.605rem" }}>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={`${column.id}-c`}
                      align={"left"}
                      colSpan={column.span}
                      className={classes.tableCell}
                      style={{
                        borderColor: "#CDCDCD",
                        color: "rgba(0, 0, 0, 0.76)",
                        fontSize: "0.875rem",
                        zIndex: 1,
                        top: topNum,
                        minWidth: column.minWidth,
                        paddingLeft: 10,
                        paddingTop: 0,
                      }}
                    >
                      <div
                        className={
                          column.hasborder
                            ? classes.divWrapperOfHeader
                            : classes.divWrapperOfHeaderAction
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "rgba(0, 0, 0, 0.87)",
                            fontSize: "0.875rem",
                            fontWeight: "normal",
                          }}
                        >
                          {column.label}
                        </div>
                      </div>
                    </StyledTableCell>
                  ))}
                </TableRow>
              ) : null}
            </TableHead>

            <TableBody>
              {
                (dataCount = stableSort(
                  data,
                  getComparator(orderDirection, valueToOrderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, i) => {
                    return <>{React.cloneElement(cells, { item: item })}</>;
                  }))
              }
            </TableBody>
          </Table>
        </TableContainer>
        {dataCount.length === 0 ? null : (
          <TablePagination
            rowsPerPageOptions={[10, 30, 50, 100, 200, 500]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </>
  );
}