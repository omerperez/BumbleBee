import React, { useState , useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  topbarMenuItems,
  topbarMenuItemsForDealer,
  topbarMenuItemsForAdmin,
} from "../Navigation/menuItems";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationPopper from "../AlertsComponents/NotificationPopper";
import SnackbarAlert from "../AlertsComponents/SnackbarAlert";
import { io } from "socket.io-client";

export default function Actions() {
  const { currentUser, logout } = useAuth();
  const matches = useMediaQuery("(max-width:515px)");
  let menu = topbarMenuItems;
  
  const [notifications, setNotifications] = useState([]);
  const [alertsToShow, setAlertsToShow] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socket?.emit("newUser", currentUser._id);
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket, notifications]);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
    fetch(
      `${process.env.REACT_APP_SERVER_API}/notification/${currentUser.role === 2 ? "dealer" : "client"}/navigation/${currentUser._id}`
    )
      .then((response) => response.json())
      .then((data) => setAlertsToShow(data));
  }, [notifications])

  if (currentUser.role === 2) {
    menu = topbarMenuItemsForDealer;
  }
  else if (currentUser.role === 3) {
    menu = topbarMenuItemsForAdmin;
  }

  return (
    <>
      <div className="icons-title-pos">
        {menu.map((item, key) => {
          return (
            <Link key={key} to={item.path} className="link-in-btn">
              <img
                src={`/topbar/${item.image}-topbar.png`}
                width={matches ? 20 : 25}
                height={matches ? 20 : 25}
                className={matches ? "m-1" : "m-2 cur-pointer"}
              />
            </Link>
          );
        })}
        {currentUser.role !== 3 ? (
          <NotificationPopper
            count={alertsToShow.length}
            alerts={alertsToShow}
          />
        ) : null}
        <img
          onClick={() => logout()}
          className={matches ? "m-1" : "m-2 cur-pointer"}
          src={`/topbar/logout-topbar.png`}
          width={matches ? 20 : 25}
          height={matches ? 20 : 25}
        />
      </div>
      <SnackbarAlert
        isOpen={alertsToShow.length > 0}
        step={
          alertsToShow.length > 0
            ? alertsToShow[alertsToShow.length - 1].step
            : null
        }
        name={
          alertsToShow.length > 0
            ? alertsToShow[alertsToShow.length - 1].senderName
            : null
        }
      />
    </>
  );
}
