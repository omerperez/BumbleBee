import React, { useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PrivateRoute from "../../Routes/PrivateRoute";
import {bumblebeeLogo} from "../images/projectImages"
import AccessDenied from "../authComponents/AccessDenied"

export default function AccessDeniedPage({showPrivateRoute}) {

  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <PrivateRoute>
      <PageTitle page={"Access Denied"} />
      <AccessDenied />
    </PrivateRoute>
  );
}
