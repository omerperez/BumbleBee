import React from "react";
import PageTitle from "../Layout/PageTitle";
import { CircularProgress } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertLayout from "../AlertsComponents/AlertLayout";

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

  const alert = {
    userId: "62373983d3d01059e218a3b2",
    carId: "6237838cf4784fc6a46f817e",
    step: 1,
    dateOfCreated: "20.01.2022",
    lastUpdateDate: "20.01.2022",
  };

   const alert1 = {
     userId: "62373983d3d01059e218a3b2",
     carId: "6237838cf4784fc6a46f817e",
     step: 2,
     dateOfCreated: "20.01.2022",
     lastUpdateDate: "20.01.2022",
   };
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
      <div className="days-grid">
        <AlertLayout alert={alert} />
        <AlertLayout alert={alert1} />
        <AlertLayout alert={alert} />
        <AlertLayout alert={alert} />
        <AlertLayout alert={alert} />
      </div>
    </>
  );
}
