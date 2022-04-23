import React, { useEffect } from "react";
import {
  topbarMenuItems,
  topbarMenuItemsForDealer,
  topbarMenuItemsForAdmin,
} from "../Navigation/menuItems";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PageTitle({ page }) {
  
  const { currentUser, logout } = useAuth();
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
                className="m-6"
                src={`/topbar/${item.image}-topbar.png`}
                width={25}
                height={25}
              />
            </Link>
          );
        })}
        <img
          onClick={() => logout()}
          className="m-6 cur-pointer"
          src={`/topbar/logout-topbar.png`}
          width={25}
          height={25}
        />
      </div>
      <h2 className="page-title-font">{page} </h2>
    </>
  );
}
