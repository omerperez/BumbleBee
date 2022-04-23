import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import UserCard from "../ProfileComponents/UserCard";
import UserFilesCard from "../ProfileComponents/UserFilesCard";
import CircularProgress from "@mui/material/CircularProgress";
import OtherPropertiesCard from "../ProfileComponents/OtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import { Card } from "@mui/material";
import MyProfile from "./MyProfile";

export default function UserProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const index = window.location.toString().lastIndexOf("/");
    let id = window.location.toString().substring(index + 1);
    if(id === "my-profile"){
      id = currentUser._id;
    }
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return (
      <div className="mt-15 d-flex justify-content-center">
        <CircularProgress size={200} />
      </div>
    );
  }
  
  if(currentUser._id === user._id){
    return <MyProfile />
  }
  
  return (
    <>
      <PageTitle />
      <div className="d-flex justify-content-centermt-5 pad-1">
        <div className="col-3 mt-5 mb-5 offset-1">
          <ProfileSide currentUser={user} />
        </div>
        <div className="col ml-25 mt-5 mb-5 col-sm-7">
          <OtherPropertiesCard currentUser={user} />
        </div>
      </div>
    </>
  );
}
