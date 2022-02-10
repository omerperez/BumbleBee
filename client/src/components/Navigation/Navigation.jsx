import React, { useState, useEffect } from "react";
import "./Navigation.modules.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import UserProfile from "./UserProfile";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { makeStyles } from "@mui/styles";
import { clientMenuItems, managerMenuItems } from "./menuItems";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: "18%",
    background: "#363636 !important",
    boxShadow: "0px 0px 0px #00000017",
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#e2a021",
    background: "#363636",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e2a021",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e2a021",
      background: 'white',
      height: "40px",
      margin: "auto",
    },
    "&:hover fieldset": {
      borderColor: "#e2a021",
      background: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e2a021",
      background: "white",
    },
  },
});

const defaultTextStyle = { color: "white", marginLeft: "10px" };
const currentPageStyle = {
  background: "#E2A025",
  color: "#363636",
  borderLeft: "solid 10px #BA8600",
};

export default function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [error, setError] = useState("");
  const { currentUser, logout, changeMode, mode } = useAuth();
  const navigate = useNavigate();
  const [check, setCheck] = useState("/homepage");

  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/");
    const id = window.location.toString().substring(index);
    // console.log(id);
    setCheck(id !== '/' ? id : '/homepage')
  }, [check]);

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
  if (currentUser.role == 2) {
    menuItems = managerMenuItems;
  }

  const drawer = (
    <div>
      <UserProfile />
      {/* <div className="search-position">
        <CssTextField
          label="Search"
          className="nav-search"
          xs={{ height: 8 }}
        />
      </div> */}
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
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <ListItem
                key={item.title}
                style={item.path == check ? currentPageStyle : defaultTextStyle}
                onClick={() => setCheck(item.path)}
              >
                <ListItemText primary={item.title} />
                {item.image ? (
                  <img
                    alt=""
                    style={item.path == check ? { marginRight: "5px" } : null}
                    src={item.image}
                    className="nav-image"
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
              style={defaultTextStyle}
              className={"menu-items"}
            />
          </ListItem>
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
