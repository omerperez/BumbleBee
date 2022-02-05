import React from "react";
import CreateCarForm from "../CarComponents/CreateCarForm";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "@mui/material/Alert";

export default function CreateCarPage() {

const {currentUser} = useAuth();

return currentUser.role == 2 ? (
  <>
    <PageTitle page={"Create New Car"} />
    <CreateCarForm />
  </>
) : (
  <>
    <PageTitle page={"Create New Car"} />
    <div className="d-flex justify-content-center" style={{margin: 'auto', height: 300}}>
      <Alert severity="error" style={{ height: 100, fontSize: 40 }}>
        Access Dienied - you are not a manager
      </Alert>
    </div>
  </>
);
    
}