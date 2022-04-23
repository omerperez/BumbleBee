import React from "react";
import PageTitle from "../Layout/PageTitle";
import { CircularProgress } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  
    return (
    <>
      <PageTitle page={"Manager Dashboard"} />
    </>
  );
}
