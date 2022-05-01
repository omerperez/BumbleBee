import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { notificationTitle } from "./AlertFunction";
import { Button } from "@mui/material";

export default function PropperListAlerts({alerts}) {
    
    if(alerts.length === 0) return null;

  return (
      alerts.map((alert) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={process.env.REACT_APP_S3 + alert.image}
                />
              </ListItemAvatar>
              <ListItemText
                primary={alert.senderName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {alert.senderEmail}
                      <br />
                      <b>{notificationTitle(alert.senderName, alert.step)}</b>
                    </Typography>
                    <div className="d-flex justify-content-center mt-2">
                      <Button color="info" variant="contained">
                        Mark as read
                      </Button>
                    </div>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
    })
  );
}
