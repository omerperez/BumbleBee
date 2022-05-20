import React from "react";
import PageTitle from "../Layout/PageTitle";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Stats from "../adminComponents/Stats";

export default function ManagerDashboard() {
  const { currentUser } = useAuth();
  return (
    currentUser.role !== 3 ? (
      <Navigate to={-1} />
    ) : (
    <>
      <PageTitle page={"Manager Dashboard"} />
      <Stats />
    </>
    )
  );
}
