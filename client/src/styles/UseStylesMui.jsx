import { makeStyles, withStyles, styled } from "@mui/styles";
import TableCell from "@mui/material/TableCell";



/* Layout */
const maxWidthCardApp = { maxWidth: 400 };
const minHeightContainerApp = { minHeight: "100vh" };

const usePrivateRouteStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "82%",
  },
}));

const usePublicRouteStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "50%",
  },
}));

const layoutStyle = { display: "flex", flexDirection: "row" };

/* Car */
const carFormStyles = makeStyles(() => ({
  chooseFile: {
    display: "flex",
    width: "70vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#363636",
    borderRadius: 5,
    color: "#363636",
    background: "#42ADFF",
  },
  noFile: {
    display: "flex",
    width: "70vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#42ADFF",
    borderRadius: 5,
    color: "#363636",
    background: "#F5F5F5",
  },
  chooseMainFile: {
    display: "flex",
    width: "70vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#363636",
    borderRadius: 5,
    color: "#363636",
    background: "#42ADFF",
  },
  noMainFile: {
    display: "flex",
    width: "50vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#90EE90",
    borderRadius: 5,
    color: "#363636",
    background: "#42ADFF",
  },
}));

/* Navigation */
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#363636",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#363636",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const navigationStyle = makeStyles(() => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "18%",
    background: "#363636 !important",
    boxShadow: "0px 0px 0px #00000017",
  },
}));

const userProfileStyles = makeStyles(() => ({
  root: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    justifyContent: "start",
    marginLeft: "0.7rem",
    alignItems: "center",
  },
  name: {
    fontSize: "1.4rem",
    fontFamily: "sans-serif",
    marginLeft: "10px !important",
    marginRight: "10px",
  },
}));

const topProfilePageStyles = makeStyles(() => ({
  root: {
    marginTop: "1.5rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    color: "#363636",
    justifyContent: "start",
    marginLeft: "2rem",
    alignItems: "center",
  },
  name: {
    fontFamily: "sans-serif",
    marginLeft: "15px !important",
  },
}));

const defaultNavigationTextStyle = {
  color: "white",
  // marginLeft: "10px",
  minHeight: "50px",
};

const navCurrentPageStyle = {
  background: "#42ADFF",
  color: "#363636",
  borderLeft: "solid 10px #179aff",
  minHeight: "50px",
};

/* Table */
const scrollTableTopStyles = makeStyles({
  toTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#4679BF",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    padding: "8px 4px 8px 4px",
    marginBottom: "20px",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "white",
      backgroundColor: "#4679BF",
    },
    right: "0.8%",
  },
});

const noResultsStyles = makeStyles({
  buttonStyle: {
    width: 141,
    textTransform: "none",
    fontSize: 16,
    fontFamily: "Fira Sans Condensed",
    fontWeight: 400,
    letterSpacing: 0.15,
    backgroundColor: "#4679BF",
    height: 32,
    marginTop: 18,
    lineHeight: "24px",
    verticalAlign: "top",
    padding: "4px 16px 4px 16px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
});

const StyledTableCell = withStyles(() => ({
  root: {
    lineHeight: "1.21rem",
    top: -1,
  },

  head: {
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

const useTableStyles = makeStyles(() => ({
  table: {
    minWidth: 666,
    fill: "rgba(0, 0, 0, 0.2)",
    // tableLayout: "fixed !important",
  },
  tableWrapper: {
    overflowX: "initial",
  },
  paper: {
    border: "1px solid #CDCDCD",
    boxShadow: "none",
    borderRadius: "0",
  },
  divWrapperOfHeader: {
    // display: "flex",
    // height: "80%",
    borderRight: "1px solid #CDCDCD",
    color: "#42ADFF",
  },
  divWrapperOfHeaderAction: {
    // display: "flex",
    // height: "80%",
    color: "#42ADFF",
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
  span: {
    display: "flex",
    alignItems: "baseline",
    flexDirection: "column",
  },
}));

/* Export Styles */
export {
  maxWidthCardApp,
  minHeightContainerApp,
  usePrivateRouteStyles,
  usePublicRouteStyles,
  layoutStyle,
  carFormStyles,
  navigationStyle,
  userProfileStyles,
  topProfilePageStyles,
  defaultNavigationTextStyle,
  navCurrentPageStyle,
  scrollTableTopStyles,
  noResultsStyles,
  StyledTableCell,
  useTableStyles,
  openedMixin,
  closedMixin,
};