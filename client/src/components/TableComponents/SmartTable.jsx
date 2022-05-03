import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { StyledTableCell, useTableStyles } from "../../styles/UseStylesMui";
import ScrollToTop from "./ScrollToTop";

const useStyles = useTableStyles;

export default function SmartTable({
  data,
  headCells,
  cells,
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
  return (
    <>
      <ScrollToTop showBelow={250}  />
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableWrapper}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
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
                        <span className={classes.span}>{headCell.label}</span>
                      </TableSortLabel>
                    </div>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => {
                  return <>{React.cloneElement(cells, { item: item })}</>;
                })}
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