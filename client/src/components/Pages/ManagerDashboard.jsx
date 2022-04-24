import React from "react";
import PageTitle from "../Layout/PageTitle";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import Stats from "../adminComponents/Stats";

export default function ManagerDashboard() {
  
  const { currentUser } = useAuth();
  if(currentUser.role !== 3){
     return (
       <>
         <PageTitle page={"Access Denied"} />
         <AccessDenied />
       </>
     );
  }
  
  return (
    <>
      <PageTitle page={"Manager Dashboard"} />
      <Stats />
    </>
  );
}
