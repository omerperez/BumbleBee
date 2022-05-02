import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'
import { ThemeProvider } from "@mui/material/styles";
import { whiteTheme } from '../theme/theme';
import NewNavigation from "../components/Navigation/NewNavigation";
import { io } from "socket.io-client";

export default function PrivateRoute({ children, showSideBar }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      socket?.emit("newUser", currentUser._id);
    }
  }, [socket]);

  const { currentUser } = useAuth();
  return currentUser ? (
    <ThemeProvider theme={whiteTheme}>
      {showSideBar && showSideBar === false ? (
        { children }
      ) : (
        <NewNavigation socket={socket}>{children}</NewNavigation>
      )}
    </ThemeProvider>
  ) : (
    <Navigate to="/login" />
  );
}
