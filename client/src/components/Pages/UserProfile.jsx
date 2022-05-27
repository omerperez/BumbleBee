import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";
import OtherPropertiesCard from "../ProfileComponents/OtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import MyProfile from "./MyProfile";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function UserProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const matches = useMediaQuery("(max-width:1000px)");
  const matches770 = useMediaQuery("(max-width:770px)");
  
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
    return <Loading />;
  }
  
  if(currentUser._id === user._id){
    return <MyProfile />
  }
  
  return (
    <>
      <PageTitle />
      <div className={matches ? "row mt-2 pad-1" : "d-flex mt-2 pad-1"}>
        {matches770 ? null : (
          <div
            className={
              matches
                ? "col-4"
                : "col-12 col-lg-5 col-xl-4 col-xxl-3 mt-5 mb-5 offset-1"
            }
          >
            <ProfileSide user={user} />
          </div>
        )}
        <div
          className={
            matches
              ? matches770
                ? "col-12"
                : "col-6"
              : "col-12 col-lg-5 col-xl-6 col-xxl-7  ml-25 mt-5 mb-5"
          }
        >
          <OtherPropertiesCard user={user} />
        </div>
      </div>
    </>
  );
}
