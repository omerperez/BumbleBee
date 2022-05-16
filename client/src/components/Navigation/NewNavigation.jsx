import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import {
  clientMenuItems,
  managerMenuItems,
  dealerMenuItems,
} from "./menuItems";
import { useAuth } from "../../contexts/AuthContext";
import MuiDrawer from "@mui/material/Drawer";
import UserProfile from "./UserProfile";
import { Link, useNavigate } from "react-router-dom";
import {
  defaultNavigationTextStyle,
  navCurrentPageStyle,
  openedMixin,
  closedMixin,
  AppBar,
} from "../../styles/UseStylesMui";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Actions from "../Layout/Actions";
import { error403 } from "../images/projectImages";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NewNavigation({socket, children }) {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const [check, setCheck] = useState("/homepage");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const matches = useMediaQuery("(min-height:0px)");
  const max800 = useMediaQuery("(max-width:800px)");
  const navigationWidth = useMediaQuery("(max-width:500px)");

  let menuItems = clientMenuItems;
  if (currentUser.role === 3) {
    menuItems = managerMenuItems;
  }
  if(currentUser.role === 2){
    menuItems = dealerMenuItems;
  }
  const handleDrawerOpen = () => {
    if(matches){
      setOpen(true);
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if(!matches){
      setOpen(false)
    }
    const index = window.location.toString().indexOf("0/");
    const id = window.location.toString().substring(index);
    const temp = id.substring(id.indexOf("/") + 1);
    const name = (
      "/" +
      temp.substring(0, temp.includes("/") ? temp.indexOf("/") : temp.length)
    ).toLowerCase();
    setCheck(name !== "/" && name !== "/car-profile" ? name : "/homepage");
  }, [navigate, matches]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Box
      sx={
        navigationWidth && open
          ? { overflow: "hidden" }
          : max800 && open && check.includes("create")
          ? { overflow: "hidden" }
          : { display: "flex" }
      }
      role={max800 ? "presentation" : null}
    >
      <AppBar
        position="absolute"
        open={open}
        sx={{ background: "none", boxShadow: "none" }}
      >
        <Toolbar sx={{ background: "none", boxShadow: "none" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color={"black"}
            noWrap
            component="div"
            style={{ marginLeft: "auto", marginRight: 10 }}
          >
            <Actions socket={socket} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        {matches ? (
          <>
            <DrawerHeader>
              {open ? (
                <>
                  <UserProfile />
                  <IconButton className="close-pos" onClick={handleDrawerClose}>
                    <ChevronLeftIcon
                      className="color-yellow cur-pointer"
                      fontSize="large"
                    />
                  </IconButton>
                </>
              ) : matches ? (
                <div className="auto-margin">
                  <IconButton
                    className="color-white"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                  >
                    {/* <MenuIcon className="cur-pointer" /> */}
                  </IconButton>
                </div>
              ) : null}
            </DrawerHeader>
            <Divider className="yellow-divider h-3" />
          </>
        ) : null}
        <List>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path.includes("mycars") ? item.path : item.path}
              className="link-in-btn"
            >
              <div>
                <ListItem
                  button
                  key={item.title}
                  style={
                    item.path === check
                      ? navCurrentPageStyle
                      : defaultNavigationTextStyle
                  }
                  className={
                    !open ? null : item.path === check ? null : "ml-10"
                  }
                  onClick={() => setCheck(item.path)}
                >
                  <ListItemText primary={open ? item.title : ""} />
                  <div className="d-flex justify-content-center">
                    <ListItemIcon>
                      <img
                        alt="nav_img"
                        src={
                          item.path === check
                            ? `/Navigation/black-${item.image}`
                            : `/Navigation/white-${item.image}`
                        }
                        className={
                          item.path === check && open
                            ? "ml-10 nav-image"
                            : item.path === check
                            ? "mr10 nav-image"
                            : "nav-image"
                        }
                        onError={error403}
                      />
                    </ListItemIcon>
                  </div>
                </ListItem>
              </div>
            </Link>
          ))}
          {error ? (
            <Alert className="border-2-black m-3" severity="error">
              <h5>{error}</h5>
            </Alert>
          ) : null}
        </List>
        {matches ? (
          <ListItem className="menuFooter">
            {open ? (
              <div>BumbleBee</div>
            ) : (
              <ListItemIcon className="d-flex justify-content-center">
                <img
                  className="footer-image"
                  src="/Navigation/bumblebee.png"
                  onError={error403}
                />
              </ListItemIcon>
            )}
          </ListItem>
        ) : null}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 2, p: 2, marginTop: "10px" }}
        onClick={() => (!matches ? handleDrawerClose() : null)}
      >
        {children}
      </Box>
    </Box>
  );
}