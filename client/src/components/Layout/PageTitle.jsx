import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  topbarMenuItems,
  topbarMenuItemsForDealer,
  topbarMenuItemsForAdmin,
} from "../Navigation/menuItems";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PageTitle({ page }) {
  
  const { currentUser, logout } = useAuth();
  const matches = useMediaQuery("(max-width:515px)");
  let menu = topbarMenuItems;
  if (currentUser.role === 2) {
    menu = topbarMenuItemsForDealer;
  }
  if (currentUser.role === 3) {
    menu = topbarMenuItemsForAdmin;
  }

  return (
    <>
      <div className="icons-title-pos">
        {menu.map((item, key) => {
          return (
            <Link key={key} to={item.path} className="link-in-btn">
              <img
                className={matches ? "m-1" : "m-6"}
                src={`/topbar/${item.image}-topbar.png`}
                width={matches ? 20 : 25}
                height={matches ? 20 : 25}
              />
            </Link>
          );
        })}
        <img
          onClick={() => logout()}
          className={matches ? "m-1" : "m-6 cur-pointer"}
          src={`/topbar/logout-topbar.png`}
          width={matches ? 20 : 25}
          height={matches ? 20 : 25}
        />
      </div>
      <h2 className={matches ? "f-22" : "page-title-font"}>{page} </h2>
    </>
  );
}
