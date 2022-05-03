import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { notificationTitle } from "./AlertFunction";
import {markAsRead} from "./AlertFunction";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function PropperListAlerts({ alerts, setFlag }) {
  
  const userReadAlert = async (id) =>  {
    const res = await markAsRead(id);
    if (res === "Success") {
      setFlag(true);
    } else {
      console.log(res);
    }
  }

  if (alerts.length === 0) return null;
  
  return alerts.map((alert, inx) => {
    return (
      <div className="row">
        <div className="col">
          <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ marginRight: "5%" }}>
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt="Remy Sharp"
                src={process.env.REACT_APP_S3 + alert.image}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.primary">
                    <span className="f-19 ls-less1 fw-100">
                      {alert.senderName}
                    </span>
                    <br />
                    <b>{notificationTitle(alert.senderName, alert.step)}</b>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
        <div className="col-2 mt-2 border-circle">
          <IconButton
            onClick={() => userReadAlert(alert._id)}
            color="error"
            aria-label="upload picture"
            component="span"
          >
            <CloseIcon fontSize="small"/>
          </IconButton>
        </div>
        {alerts.length !== inx + 1 ? <Divider /> : null}
      </div>
    );
  });
}
