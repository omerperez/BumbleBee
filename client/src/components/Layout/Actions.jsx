import React, { useState , useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationPopper from "../AlertsComponents/NotificationPopper";
import SnackbarAlert from "../AlertsComponents/SnackbarAlert";
import { error403 } from "../images/projectImages";
import UserChangeCurrency from "./UserChangeCurrency";
import {
  topbarMenuItems,
  topbarMenuItemsForDealer,
  topbarMenuItemsForAdmin,
} from "../Navigation/menuItems";
import {isShowCurrencyAction} from "../../utils/functions";

export default function Actions() {
  const { currentUser, logout, currency, setCurrency } = useAuth();
  const matches = useMediaQuery("(max-width:515px)");
  const [alertsToShow, setAlertsToShow] = useState([]);
  const [flag, setFlag] = useState(false);
  const [state, setState] = useState({ num: 0 });
  const [showCurrency, setShowCurrency] = useState(true);
  let menu = topbarMenuItems;

  useEffect(() => {
    setShowCurrency(isShowCurrencyAction(window.location.pathname));
  }, [window.location.pathname]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/notification/${
        currentUser.role === 2 ? "dealer" : "client"
      }/navigation/${currentUser._id}`
    )
      .then((response) => response.json())
      .then((data) => setAlertsToShow(data));
    const timer = setTimeout(() => setState({ num: state.num + 1 }), 10000);
    return () => clearTimeout(timer);
  }, [state, flag]);

  if (currentUser.role === 2) {
    menu = topbarMenuItemsForDealer;
  }
  else if (currentUser.role === 3) {
    menu = topbarMenuItemsForAdmin;
  }

  return (
    <>
      <div className="icons-title-pos">
        {showCurrency ? (
          <UserChangeCurrency currency={currency} setCurrency={setCurrency} />
        ) : null}
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
      {alertsToShow && alertsToShow.length > 0 ? (
        <SnackbarAlert
          isOpen={true}
          step={alertsToShow[alertsToShow.length - 1].step}
          name={alertsToShow[alertsToShow.length - 1].senderName}
        />
      ) : null}
    </>
  );
}
