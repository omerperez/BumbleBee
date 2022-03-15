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

export default function PrivateRoute({ children }) {

    const { currentUser, mode } = useAuth();
    const classes = usePrivateRouteStyles();

    return currentUser ? (
      <ThemeProvider theme={mode ? whiteTheme : darkTheme}>
        {/* <Paper variant="outlined" >
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
            > */}
        <NewNavigation>{children}</NewNavigation>

        {/* </Drawer>
          </Grid>
        </Paper> */}
      </ThemeProvider>
    ) : (
      <Navigate to="/login" />
    );
}
