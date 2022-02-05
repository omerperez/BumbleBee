import React from "react";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { authBackground } from "../images/projectImages"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "50%",
  },
}));

export default function AuthLayout({ children }) {

  const classes = useStyles();
  const theme = useTheme();

  return (
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
