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

export default function Actions({ socket }) {
  const { currentUser, logout } = useAuth();
  const matches = useMediaQuery("(max-width:515px)");
  let menu = topbarMenuItems;
  
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    console.log(socket);
    console.log("socket");

    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket, notifications]);

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
            count={notifications.length}
            alerts={notifications}
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
        isOpen={notifications.length > 0}
        step={
          notifications.length > 0
            ? notifications[notifications.length - 1].step
            : null
        }
        name={
          notifications.length > 0
            ? notifications[notifications.length - 1].senderName
            : null
        }
      />
    </>
  );
}
