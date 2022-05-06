import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";
import OtherPropertiesCard from "../ProfileComponents/OtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import axios from "axios";
import RequestSteps from "../AlertsComponents/RequestSteps";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MyProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const matches = useMediaQuery("(max-width:1000px)");
  const matches770 = useMediaQuery("(max-width:770px)");

  const fetchData = () => {
    const currentUserApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`;
    const notificationApi = `${process.env.REACT_APP_SERVER_API}/notification/client/${currentUser._id}`;

    const getUser = axios.get(currentUserApi);
    const getNotification = axios.get(notificationApi);

    axios.all([getUser, getNotification]).then(
      axios.spread((...allData) => {
        const userData = allData[0].data;
        const notificationData = allData[1].data;
        setUser(userData);
        setAlert(
          notificationData.length > 0 ? notificationData[notificationData.length - 1] : null
        );
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  
  return (
    <>
      <PageTitle />
      <div className={matches ? "row  mt-2 pad-1" : "d-flex mt-2 pad-1"}>
        {matches770 ? null : (
          <div
            className={
              matches
                ? "col-4"
                : "col-12 col-lg-5 col-xl-4 col-xxl-3 mt-5 mb-5 offset-1"
            }
          >
            <ProfileSide currentUser={user} />
          </div>
        )}
        <div
          className={
            matches
              ? matches770
                ? "col-12"
                : "col-6"
              : "col-12 col-lg-5 col-xl-6 col-xxl-7 ml-25 mt-5 mb-1"
          }
        >
          <OtherPropertiesCard currentUser={user} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {user.role === 1 ? (
            <RequestSteps step={alert ? alert.step : 0} />
        ) : null}
      </div>
    </>
  );
}
