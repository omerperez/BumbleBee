import React, { useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PrivateRoute from "../../Routes/PrivateRoute";
import { bumblebeeLogo } from "../images/projectImages";

export default function AccessDenied({ showPrivateRoute }) {
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
    <>
      <div className="pl-1 pr-1">
        <Alert severity="error">
          <h3>
            <b>User Connect Error</b>
          </h3>
          <h5>
            You're still connected to{" "}
            <b>{currentUser.firstName + " " + currentUser.lastName}</b>
          </h5>
          <h5>please log out before you go to this page</h5>
          <h5 className="mt-4">
            <Button variant="outlined" color="error" onClick={handleLogout}>
              <strong>Logout now !</strong>
            </Button>
            {error ? <strong>{error}</strong> : null}
          </h5>
        </Alert>
      </div>
      <div className="d-flex justify-content-center">
        <img src={bumblebeeLogo} />
      </div>
    </>
  );
}
