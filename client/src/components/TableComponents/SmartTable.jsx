import React, { useState } from "react";
import { withStyles } from "@mui/styles";
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    borderRight: "none !important"
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
                {headCells.map((headCell, key) => (
                  <StyledTableCell
                    key={headCell.label}
                    align={"left"}
                    style={headCell.style}
                  >
                    <div
                      className={
                        headCell.label !== "Action"
                          ? classes.divWrapperOfHeader
                          : classes.divWrapperOfHeaderAction
                      }
                    >
                      <TableSortLabel
                        key={headCell.id + key}
                        className={classes.sortLabel}
                        hideSortIcon={false}
                        align={"left"}
                        active={false}
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
                        </span>
                      </TableSortLabel>
                    </div>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, i) => {
                    return (
                      <>{React.cloneElement(cells, { item: item })}</>
                    );
                  })
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