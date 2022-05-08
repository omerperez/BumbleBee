import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropperListAlerts from "./PropperListAlerts";
import List from "@mui/material/List";
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
                paddingBottom: 1
              }}
            >
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
                "No Notification Yet"
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
