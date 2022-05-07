import React, { useState, useEffect } from "react";
import PageTitle from "../Layout/PageTitle";
import Loading from "../Layout/Loading";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import AlertLayout from "../AlertsComponents/AlertLayout";
import TotalAlertStatistic from "../AlertsComponents/TotalAlertStatistic";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function OrderStatus() {
   const { currentUser, socket } = useAuth();
   const [loading, setLoading] = useState(true);
   const [alerts, setAlerts] = useState(null);
   const [notifications, setNotifications] = useState([]);
   const matches = useMediaQuery("(max-width:600px)");

   useEffect(() => {
     fetch(
       `${process.env.REACT_APP_SERVER_API}/notification/user/${currentUser._id}`
     ).then((res) =>
       res.json().then((data) => {
         const sortAlerts =
           data.length > 0
             ? data.sort((a, b) => {
                 return a.step - b.step;
               })
             : data;
         setAlerts(sortAlerts);
         setLoading(false);
       })
     );
   }, [notifications, currentUser._id]);
   
   useEffect(() => {
     socket?.emit("newUser", currentUser._id);
     socket?.on("getNotification", (data) => {
       setNotifications((prev) => [...prev, data]);
     });
   }, [socket, notifications, currentUser._id]);

   
  if (loading) return <Loading />;
  
  if (currentUser && currentUser.role !== 2) {
    return (
      <>
        <PageTitle page={"Access Denied"} />
        <AccessDenied />
      </>
    );
  }
  
  return (
    <div>
      <PageTitle page={"Order Status"} />
      {matches ? null : <TotalAlertStatistic alerts={alerts} />}
      <div>
        {alerts &&
          alerts.map((alt, inx) => {
            return (
              <div key={inx}>
                <AlertLayout
                  key={alt._id}
                  alert={alt}
                  isDealer={currentUser.role === 2}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}


