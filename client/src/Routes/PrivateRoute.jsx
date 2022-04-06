import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'
import { Grid } from '@mui/material';
import Layout from '../components/Layout/Layout';
import Drawer from "@mui/material/Drawer";
import { usePrivateRouteStyles, layoutStyle } from "../styles/UseStylesMui";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { darkTheme, whiteTheme } from '../theme/theme';
import NewNavigation from "../components/Navigation/NewNavigation";

export default function PrivateRoute({ children, showSideBar }) {

    const { currentUser, mode } = useAuth();
    const classes = usePrivateRouteStyles();

    return currentUser ? (
      <ThemeProvider theme={mode ? whiteTheme : darkTheme}>
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
