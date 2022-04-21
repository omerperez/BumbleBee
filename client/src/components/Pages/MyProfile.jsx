import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import UserCard from "../ProfileComponents/UserCard";
import UserFilesCard from "../ProfileComponents/UserFilesCard";
import CircularProgress from "@mui/material/CircularProgress";
import OtherPropertiesCard from "../ProfileComponents/OtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import { Card, Divider } from "@mui/material";
import useForm from "../../utils/useForm";
import RequestSteps from "../AlertsComponents/RequestSteps";

export default function MyProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [values, carChange] = useForm();

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
        style={{ padding: "1%" }}
      >
        <div className="col-3 mt-5 mb-5 offset-1">
          <ProfileSide currentUser={user} />
          {user.role === 1 ? (
            <>
              <div className="mt-4">
                <h3 style={{ fontWeight: 200 }}> Request Steps </h3>
              </div>
            </>
          ) : null}
        </div>
        <div className="col-9 ml-25 mt-5 mb-5 col-sm-7">
          <OtherPropertiesCard currentUser={user} />
        </div>
      </div>
      <div className="d-flex justify-content-center">{user.role === 1 ? <RequestSteps /> : null}</div>
    </>
  );
}
