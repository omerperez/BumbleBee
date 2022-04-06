import React from "react";
import PageTitle from "../Layout/PageTitle";
import { CircularProgress } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function OrderStatus() {
   const { currentUser } = useAuth();
   const navigate = useNavigate();
   
  // if (loading) {
  //   return (
  //     <div
  //       style={{ marginTop: "15%" }}
  //       className="d-flex justify-content-center"
  //     >
  //       <CircularProgress size={200} />
  //     </div>
  //   );
  // }

  if (currentUser && currentUser.role !== 2) {
    return (
      <>
        <PageTitle page={"Access Denied"} />
        <AccessDenied />
      </>
    );
  }
  return (
    <>
      <PageTitle page={"Order Status"} />
    </>
  );
}
