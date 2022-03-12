import { makeStyles } from "@mui/styles";

export const useTableStyles = makeStyles((theme) => ({
  table: {
    minWidth: 666,
    fill: "rgba(0, 0, 0, 0.2)",
    tableLayout: "fixed !important",
  },
  tableWrapper: {
    overflowX: "initial",
  },
  paper: { 
      border: "1px solid #CDCDCD", boxShadow: "none", borderRadius: "0"
     },
  divWrapperOfHeader: {
    display: "flex",
    height: "80%",
    borderRight: "1px solid #CDCDCD",
    color: "#212121",
  },
  divWrapperOfHeaderAction: {
    display: "flex",
    height: "80%",
    color: "#212121",
  },
  sortLabel: {
    fontWeight: 700,
    width: "100%",
    "&::after": {
      borderRight: "1px solid #CDCDCD",
      position: "absolute",
      width: 1,
      height: "100%",
      top: "12px",
      right: "-1px",
    },
  },
  sortLabelNoBorderAfter: {
    fontFamily: "FiraSansCondensed-Regular !important",
    fontWeight: 700,
    width: "100%",
  },
  span:{
       display: "flex", alignItems: "baseline", flexDirection: "column" 
    },
}));

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}
