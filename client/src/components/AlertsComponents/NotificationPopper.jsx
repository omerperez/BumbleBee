import React, {useEffect, useState} from "react";
import {
  Box,
  Popper,
  Fade,
  Badge,
  useMediaQuery,
  List,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener"
import PropperListAlerts from "./PropperListAlerts";
import { error403 } from "../images/projectImages";

export default function NotificationPopper({ count, alerts, setFlag }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState(alerts);
  const matches = useMediaQuery("(max-width:515px)");

  useEffect(() => {
    setNotification(alerts);
  }, [alerts]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const closeByHandle = (event) => {
    if (anchorEl.current && anchorEl.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
      <Badge
        onClick={handleClick}
        badgeContent={count}
        color="error"
        style={
          matches
            ? { marginLeft: 2, marginRight: 2 }
            : { marginLeft: 4, marginRight: 10 }
        }
      >
        <img
          alt="user-img"
          className="cur-pointer"
          src={`/topbar/notification-topbar.png`}
          width={matches ? 20 : 25}
          height={matches ? 20 : 25}
          onError={error403}
        />
      </Badge>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 2,
                bgcolor: "background.paper",
                marginLeft: "auto",
                marginTop: 1,
                marginRight: 5,
                paddingBottom: 1,
              }}
            >
              <ClickAwayListener onClickAway={closeByHandle}>
              {alerts.length > 0 ? (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <PropperListAlerts setFlag={setFlag} alerts={notification} />
                </List>
              ) : (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  No Notification Yet
                </List>
              )}
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
