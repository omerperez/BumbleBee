import React from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import CarForm from "../CarComponents/CarForm";


export default function CreateCarPage() {

  const {currentUser} = useAuth();

  return currentUser && currentUser.role !== 1 ? (
    <div className="ml-8">
      <PageTitle page={"Create New Car"} />
      <CarForm />
    </div>
  ) : (
    <>
      <PageTitle page={"Create New Car"} />
      <div className="d-flex justify-content-center auto-margin">
        <Alert severity="error" className="font-40 h-100 m-auto">
          Access Dienied - you are not a manager
        </Alert>
      </div>
    </>
  );
    
}