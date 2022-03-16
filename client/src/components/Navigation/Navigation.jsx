import React, { useState, useEffect } from "react";
import "./Navigation.modules.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import UserProfile from "./UserProfile";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import {
  clientMenuItems,
  managerMenuItems,
} from "./menuItems";
import {
  defaultNavigationTextStyle,
  navCurrentPageStyle,
  navigationStyle,
} from "../../styles/UseStylesMui";

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
              to={
                item.path.includes("mycars")
                  ? item.path + "/" + currentUser._id
                  : item.path
              }
              className="link-in-btn"
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
