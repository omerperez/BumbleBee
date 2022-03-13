import React from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import TopProfilePage from "../ProfileComponents/TopProfilePage";


export default function MyProfile() {
  
  const { currentUser } = useAuth();
  
  return (
    <>
      <PageTitle page={"My Profile"} />
      <TopProfilePage
        fullName={currentUser.firstName + " " + currentUser.lastName}
        image={"./mini.jpeg"}
      />
    </>
  );
}
