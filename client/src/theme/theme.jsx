import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#111821",
      paper: "black",
    },
    text: {
      primary: "#fff",
      secondary: "#cccccc",
    },
  },
});
export const whiteTheme = createTheme({
  palette: {
    type: "light",
  },
  text: {
    primary: "black",
    secondary: "black",
  },
});

let theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
});

theme = createTheme(theme, {
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 12px",
        },
        head: {
          fontFamily: "FiraSansCondensed-Regular",
          padding: "8px 0px 8px 12px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          fontSize: "0.812rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.812rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          height: "0.9em",
          width: "0.9em",
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          fontFamily: "FiraSansCondensed-Bold",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "2px solid #e2a021",
          backgroundColor: 'white',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
  },
});

export default theme;
