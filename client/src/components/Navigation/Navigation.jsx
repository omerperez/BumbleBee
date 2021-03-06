import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.modules.css";
import UserProfile from "./UserProfile";
import { useAuth } from "../../contexts/AuthContext";
import {
  clientMenuItems,
  managerMenuItems,
} from "./menuItems";
import {
  defaultNavigationTextStyle,
  navCurrentPageStyle,
  navigationStyle,
} from "../../styles/UseStylesMui";
import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";

import { error403 } from "../images/projectImages";

export default function Navigation() {
  const classes = navigationStyle();
  const theme = useTheme();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { currentUser, logout, changeMode, mode } = useAuth();
  const [check, setCheck] = useState("/homepage");

  useEffect(() => {
    const index = window.location.toString().indexOf("0/");
    const id = window.location.toString().substring(index);
    const temp = id.substring(id.indexOf("/") + 1);
    const name =
    (  "/" +
      temp.substring(0, temp.includes("/") ? temp.indexOf("/") : temp.length)).toLowerCase(); 
    setCheck(name !== "/" && name !== "/car-profile" ? name : "/homepage");
  }, [navigate]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  let menuItems = clientMenuItems;
  if (currentUser.role === 2) {
    menuItems = managerMenuItems;
  }

  const drawer = (
    <div>
      <UserProfile />
      <div className="d-flex justify-content-center">
        <FormControlLabel
          control={<Switch defaultChecked onClick={() => changeMode(mode)} />}
          label={mode ? "Light Mode" : "Dark Mode"}
        />
      </div>
      <Divider className="yellow-divider" />
      <List>
        {menuItems.map((item, i) => {
          return (
            <Link
              key={i}
              className="link-in-btn"
              to={
                item.path.includes("mycars")
                  ? item.path + "/" + currentUser._id
                  : item.path
              }
            >
              <ListItem
                key={item.title}
                style={
                  item.path === check
                    ? navCurrentPageStyle
                    : defaultNavigationTextStyle
                }
                onClick={() => setCheck(item.path)}
              >
                <ListItemText primary={item.title} />
                {item.image ? (
                  <img
                    alt="nav_img"
                    src={item.image}
                    className={
                      item.path === check ? "mr-5 nav-image" : "nav-image"
                    }
                    onError={error403}
                  />
                ) : null}
              </ListItem>
            </Link>
          );
        })}
        <div onClick={handleLogout}>
          <ListItem button disabled={false} key={"Log Out"}>
            <ListItemText
              primary={"Log Out"}
              style={defaultNavigationTextStyle}
              className={"menu-items"}
            />
          </ListItem>
          {error ? (
            <Alert className="border-2-black m-3" severity="error">
              <h5>{error}</h5>
            </Alert>
          ) : null}
        </div>
      </List>
      <ListItem className="menuFooter">
        <div>BumbleBee</div>
      </ListItem>
    </div>
  );

  return (
    <Drawer
      container={"Home Page"}
      variant="permanent"
      anchor={theme.direction === "rtl" ? "right" : "left"}
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawer}
    </Drawer>
  );
}
