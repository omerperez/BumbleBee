import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { Grid } from '@mui/material';
import Layout from './Layout';
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

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

    const { currentUser } = useAuth();
    const classes = useStyles();
    const theme = useTheme();

    console.log(currentUser);
    return currentUser ? (
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
    ) : (
      <Navigate to="/login" />
    );
}
