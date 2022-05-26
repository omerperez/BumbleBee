import React, { useState } from "react";
import { notificationTitle } from "./AlertFunction";
import {markAsRead} from "./AlertFunction";
import {
  Button,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PropperListAlerts({ alerts, setFlag }) {
  
  const {currentUser} = useAuth();
  const [page, setPage] = useState(window.location.toString().indexOf("order-status") != - 1 ? true : false);
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
      <>
        <div className="row">
          <div className="col">
            <Link to="/order-status" className="cancel-underline">
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
            </Link>
          </div>
          <div className="col-2 mt-2 border-circle">
            <IconButton
              onClick={() => userReadAlert(alert._id)}
              color="error"
              aria-label="upload picture"
              component="span"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        {alerts.length !== inx + 1 ? (
          <Divider />
        ) : page ? null : (
          <div className="bg-col-blue">
            <Divider />
            <Link
              to={currentUser.role == 2 ? "/order-status" : "/my-profile"}
              className="cancel-underline"
            >
              <Button
                fullWidth
                className="capital-letter f-17 fw-100 mt-1 color-white mb-1"
              >
                Click For More Details <ArrowForwardIcon className="ml-10" />
              </Button>
            </Link>
          </div>
        )}
      </>
    );
  });
}
