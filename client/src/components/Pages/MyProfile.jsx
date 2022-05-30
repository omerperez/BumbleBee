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
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [alert, setAlert] = useState(null);
  const matches = useMediaQuery("(max-width:1000px)");
  const matches770 = useMediaQuery("(max-width:770px)");

  const fetchData = () => {
    // const currentUserApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`;
    const notificationApi = `${process.env.REACT_APP_SERVER_API}/notification/client/${currentUser._id}`;
    // const getUser = axios.get(currentUserApi);
    const getNotification = axios.get(notificationApi);
    // getUser,
    axios.all([getNotification]).then(
      axios.spread((...allData) => {
        // const userData = allData[0].data;
        const notificationData = allData[0].data;
        // setUser(userData);
        setAlert(
          notificationData.length > 0
            ? notificationData[notificationData.length - 1]
            : null
        );
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

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
                : "col-12 col-lg-5 col-xl-4 col-xxl-3 mt-5 mb-5 offset-xxl-1"
            }
          >
            <ProfileSide user={currentUser} />
          </div>
        )}
        <div
          className={
            matches
              ? matches770
                ? "col-12  mt-3"
                : "col-6"
              : "col-12 col-lg-5 col-xl-6 col-xxl-7 ml-25 mt-5 mb-1"
          }
        >
          <OtherPropertiesCard
            user={currentUser}
            setFlag={setFlag}
            flag={flag}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5">
        {currentUser.role === 1 ? (
          <RequestSteps
            step={alert ? alert.step : 0}
            matches770={matches770 ? true : false}
          />
        ) : null}
      </div>
    </>
  );
}
