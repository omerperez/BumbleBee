import React, { useState, useEffect } from "react";
import PageTitle from "../Layout/PageTitle";
import Loading from "../Layout/Loading";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import AlertLayout from "../AlertsComponents/AlertLayout";
import TotalAlertStatistic from "../AlertsComponents/TotalAlertStatistic";
import { io } from "socket.io-client";

export default function OrderStatus() {
   const { currentUser } = useAuth();
   const [loading, setLoading] = useState(true);
   const [alerts, setAlerts] = useState(null);
   const [socket, setSocket] = useState(null);
   const [notifications, setNotifications] = useState([]);

   useEffect(() => {
     if(socket == null){
       setSocket(io("http://localhost:5001"));
     }
     fetch(
       `${process.env.REACT_APP_SERVER_API}/notification/user/${currentUser._id}`
     ).then((res) =>
       res.json().then((data) => {
         setAlerts(data);
         setLoading(false);
       })
     );
   }, [notifications]);
   
   useEffect(() => {
     socket?.emit("newUser", currentUser._id);
     socket?.on("getNotification", (data) => {
       setNotifications((prev) => [...prev, data]);
     });
   }, [socket, notifications]);

   
  if (loading) {
    return <Loading />;
  }
  
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
      <TotalAlertStatistic alerts={alerts} />
      <div>
        {alerts &&
        //  alerts
        //     .sort((a, b) => {
        //       return a.step - b.step;
        //     })
             alerts
            .map((alt, inx) => {
              return (
                <div>
                  <AlertLayout
                    key={inx + alt._id}
                    alert={alt}
                    isDealer={currentUser.role == 2}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
}


