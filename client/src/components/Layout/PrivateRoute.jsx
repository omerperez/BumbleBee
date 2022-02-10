import React, {useState} from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { Grid } from '@mui/material';
import Layout from './Layout';
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { darkTheme, whiteTheme } from '../../theme/theme';

const layoutStyle = { display: "flex", flexDirection: "row" };

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "82%",
  },
}));

export default function PrivateRoute({ children }) {

    const { currentUser, mode } = useAuth();
    const classes = useStyles();
    const theme = useTheme();

    return currentUser ? (
      <ThemeProvider theme={mode ? whiteTheme : darkTheme}>
        <Paper variant="outlined" style={{ minHeight: "100vh" }}>
          <Grid style={{ layoutStyle }}>
            <Grid className="nav-width">
              <Layout />
            </Grid>
            <Drawer
              variant="permanent"
              anchor={"right"}
              classes={{
                paper: classes.drawerPaper,
              }}
              open={true}
            >
              {children}
            </Drawer>
          </Grid>
        </Paper>
      </ThemeProvider>
    ) : (
      <Navigate to="/login" />
    );
}
