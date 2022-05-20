import React, { useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AccessDenied from "../authComponents/AccessDenied"

export default function AccessDeniedPage({showPrivateRoute}) {

  const { logout } = useAuth();
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
      <PageTitle page={"Access Denied"} />
      <AccessDenied />
    </>
  );
}
