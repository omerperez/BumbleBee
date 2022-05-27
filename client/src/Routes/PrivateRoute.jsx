import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'
import { ThemeProvider } from "@mui/material/styles";
import { whiteTheme } from '../theme/theme';
import NewNavigation from "../components/Navigation/NewNavigation";

export default function PrivateRoute({ children, showSideBar }) {

  const { currentUser, cookies } = useAuth();
  const cookieCurrentUser = cookies.get().get("connectUser");

  return currentUser || cookieCurrentUser != undefined ? (
    <ThemeProvider theme={whiteTheme}>
      {showSideBar && showSideBar === false ? (
        { children }
      ) : (
        <NewNavigation>{children}</NewNavigation>
      )}
    </ThemeProvider>
  ) : (
    <Navigate to="/login" />
  );
}
