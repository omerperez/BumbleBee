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
import { error403 } from "../images/projectImages";

export default function Actions() {

  const { currentUser, logout, socket } = useAuth();
  const matches = useMediaQuery("(max-width:515px)");
  const [notifications, setNotifications] = useState([]);
  const [alertsToShow, setAlertsToShow] = useState([]);
  const [flag, setFlag] = useState(false);
  let menu = topbarMenuItems;
  
  useEffect(() => {
    socket?.emit("newUser", currentUser._id);
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    setFlag(false);
  }, [socket, notifications, currentUser._id]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/notification/${
        currentUser.role === 2 ? "dealer" : "client"
      }/navigation/${currentUser._id}`
    )
      .then((response) => response.json())
      .then((data) => setAlertsToShow(data));
  }, [notifications, flag, currentUser.role, currentUser._id]);

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
                alt={item.path}
                src={`/topbar/${item.image}-topbar.png`}
                width={matches ? 20 : 25}
                height={matches ? 20 : 25}
                className={matches ? "m-1" : "m-2 cur-pointer"}
                onError={error403}
              />
            </Link>
          );
        })}
        {currentUser.role !== 3 ? (
          <NotificationPopper
            count={alertsToShow.length}
            alerts={alertsToShow}
            setFlag={setFlag}
          />
        ) : null}
        <img
          alt="logout-icon"
          onClick={() => logout()}
          className={matches ? "m-1 cur-pointer" : "m-2 cur-pointer"}
          src={`/topbar/logout-topbar.png`}
          width={matches ? 20 : 25}
          height={matches ? 20 : 25}
          onError={error403}
        />
      </div>
      <SnackbarAlert
        isOpen={alertsToShow.length > 0 ? true : false}
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
