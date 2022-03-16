import { createTheme } from "@mui/material/styles";

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
