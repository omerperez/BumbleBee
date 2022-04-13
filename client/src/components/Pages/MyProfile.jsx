import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import UserCard from "../ProfileComponents/UserCard";
import UserFilesCard from "../ProfileComponents/UserFilesCard";
import CircularProgress from "@mui/material/CircularProgress";
import DealerOtherPropertiesCard from "../ProfileComponents/DealerOtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import { Card } from "@mui/material";

export default function MyProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`)
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
  
  return (
    <>
      <PageTitle />
      <div
        className="d-flex justify-content-centermt-5"
        style={{ padding: "5%" }}
      >
        <Card
          className="row mb-2"
          sx={{ boxShadow: "none" }}
        >
          {/* <div className="row mt-5"> */}
          <div className="col-3 mt-5 mb-5 offset-1">
            <ProfileSide currentUser={user} />
          </div>
          {user.role !== 1 ? (
            <div className="col ml-25 mt-5 mb-5 col-sm-7">
              <DealerOtherPropertiesCard />
            </div>
          ) : (
            <div className="col-7 mt-3">
              <div>
                <UserFilesCard />
              </div>
              <div className="mt-3 mb-3">
                <UserFilesCard />
              </div>
            </div>
          )}
        </Card>
        {/* </div> */}
      </div>
    </>
  );
}
