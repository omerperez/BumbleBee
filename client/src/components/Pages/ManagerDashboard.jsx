import React from "react";
import PageTitle from "../Layout/PageTitle";
import Stats from "../adminComponents/Stats";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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
