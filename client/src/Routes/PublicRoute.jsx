import React from "react";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { usePublicRouteStyles } from "../styles/UseStylesMui";
import { useTheme } from "@mui/material/styles";
import { authBackground } from "../components/images/projectImages"
import { useAuth } from "../contexts/AuthContext";
import AccessDenied from "../components/Pages/AccessDeniedPage"

export default function PublicRoute({ children }) {

  const classes = usePublicRouteStyles();
  const theme = useTheme();
  const { currentUser } = useAuth();
  
  return currentUser ? (
    <AccessDenied />
  ) : 
  (
    <Grid className="layout">
      <Grid>
        <Grid item xs={6}>
          <Drawer
            variant="permanent"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={true}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <img alt="" src={authBackground} className="h-100" />
          </Drawer>
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={6}>
          <Drawer
            variant="permanent"
            anchor={"right"}
            classes={{
              paper: classes.drawerPaper,
            }}
            open={true}
          >
            <div className="auto-margin">{children}</div>
          </Drawer>
        </Grid>
      </Grid>
    </Grid>
  );
}
